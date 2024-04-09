import { ApiHandler } from "sst/node/api";

import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

interface Database {
  user: {
    email: string;
    firstname: string;
    lastname: string;
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
  const { email, firstname, lastname } = JSON.parse(event.body || "");
  if (email && firstname && lastname) {
    const record = await db
      .insertInto("user")
      .values({ email: "abc@abc.com", firstname: "Abc", lastname: "What" })
      .executeTakeFirst();
    if (record) {
      return {
        statusCode: 200,
        body: `Successfully created user ${firstname} ${lastname}`,
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
  const record = await db.selectFrom("user").select("firstname").execute();

  return {
    statusCode: 200,
    body: JSON.stringify(record),
  };
});
