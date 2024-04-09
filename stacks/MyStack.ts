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
      "GET /users": "packages/functions/src/user.list",
      "POST /user": "packages/functions/src/user.create",
      // "GET /user/{id}": "packages/functions/src/user.get",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
