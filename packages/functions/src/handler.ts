import { ApiHandler } from "sst/node/api";
import { drizzle } from "drizzle-orm/aws-data-api/pg";

import { RDSDataClient } from "@aws-sdk/client-rds-data";
import { RDS } from "sst/node/rds";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

import { isValidUser } from "./user";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { eq, ilike } from "drizzle-orm";

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
});

const rdsClient = new RDSDataClient();
const db2 = drizzle(rdsClient, {
  database: RDS.database.defaultDatabaseName,
  secretArn: RDS.database.secretArn,
  resourceArn: RDS.database.clusterArn,
});

export const create: APIGatewayProxyHandlerV2 = async (event) => {
  const { email, first_name, last_name } = JSON.parse(event.body || "");
  if (isValidUser({ email, first_name, last_name })) {
    const record = await db2
      .insert(users)
      .values({ email, firstName: first_name, lastName: last_name });

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
  const record = await db2.select().from(users);

  return {
    statusCode: 200,
    body: JSON.stringify(record),
  };
});

export const get = ApiHandler(async (event) => {
  const id = parseInt(event.pathParameters?.id || "");
  if (id) {
    const record = await db2.select().from(users).where(eq(users.id, id));

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
    const record = await db2
      .select()
      .from(users)
      .where(ilike(users.lastName, `%${last_name}%`));

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
