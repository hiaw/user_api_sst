import { StackContext, Api, RDS } from "sst/constructs";

export function API({ stack }: StackContext) {
  const db = new RDS(stack, "database", {
    engine: "postgresql13.9",
    defaultDatabaseName: "company",
    migrations: "migrations",
    scaling: {
      autoPause: true,
      minCapacity: "ACU_2",
      maxCapacity: "ACU_2",
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [db],
      },
    },
    routes: {
      "POST /user": "packages/functions/src/handler.create",
      "GET /users": "packages/functions/src/handler.list",
      "GET /user/{id}": "packages/functions/src/handler.get",
      "GET /user/last-name/{lastname}":
        "packages/functions/src/handler.findByLastName",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
