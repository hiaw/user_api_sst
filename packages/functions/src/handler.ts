import { ApiHandler } from "sst/node/api";

import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import { isValidUser } from "./user";

interface Database {
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

const db = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      database: RDS.database.defaultDatabaseName,
      secretArn: RDS.database.secretArn,
      resourceArn: RDS.database.clusterArn,
      client: new RDSData({}),
    },
  }),
});

export const create: APIGatewayProxyHandlerV2 = async (event) => {
  const { email, firstName, lastName } = JSON.parse(event.body || "");
  if (isValidUser({ email, firstName, lastName })) {
    const record = await db
      .insertInto("user")
      .values({ email, firstName, lastName })
      .executeTakeFirst();
    if (record) {
      return {
        statusCode: 200,
        body: `Successfully created user ${firstName} ${lastName}`,
      };
    }
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }

  return {
    statusCode: 400,
    body: "Invalid input",
  };
};

export const list = ApiHandler(async (_evt) => {
  const record = await db.selectFrom("user").select("firstName").execute();

  return {
    statusCode: 200,
    body: JSON.stringify(record),
  };
});
