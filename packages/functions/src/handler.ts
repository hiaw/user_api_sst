import { ApiHandler } from "sst/node/api";

import { RDSData } from "@aws-sdk/client-rds-data";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "sst/node/rds";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import { isValidUser } from "./user";

interface Database {
  user: {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
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
  const { email, first_name, last_name } = JSON.parse(event.body || "");
  if (isValidUser({ email, first_name, last_name })) {
    const record = await db
      .insertInto("user")
      .values({ email, first_name, last_name })
      .executeTakeFirst();
    if (record) {
      return {
        statusCode: 200,
        body: `Successfully created user ${first_name} ${last_name}`,
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
  const record = await db.selectFrom("user").selectAll().execute();

  return {
    statusCode: 200,
    body: JSON.stringify(record),
  };
});

export const get = ApiHandler(async (event) => {
  const id = parseInt(event.pathParameters?.id || "");
  if (id) {
    const record = await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", id)
      .execute();

    return {
      statusCode: 200,
      body: JSON.stringify(record),
    };
  }

  return {
    statusCode: 400,
    body: "Invalid ID",
  };
});

export const withLastName = ApiHandler(async (event) => {
  const last_name = event.pathParameters?.last_name || "";
  if (last_name) {
    const record = await db
      .selectFrom("user")
      .selectAll()
      .where("last_name", "=", last_name)
      .execute();

    return {
      statusCode: 200,
      body: JSON.stringify(record),
    };
  }

  return {
    statusCode: 400,
    body: "Invalid last name",
  };
});
