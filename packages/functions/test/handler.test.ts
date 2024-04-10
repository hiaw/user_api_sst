import { create, get, list, withLastName } from "../src/handler";
import { describe, expect, test } from "vitest";

describe("create user", () => {
  const last_name = "Doe";
  const email = "john@doe.com";

  test("invalid input", async () => {
    const event = {
      body: JSON.stringify({ email, first_name: "", last_name }),
    };

    const result = await create(event);

    expect(result).toEqual({
      statusCode: 400,
      body: "Invalid input",
    });
  });
});

describe("list", () => {
  test("empty id", async () => {
    const result = await list({});

    expect(result).toHaveProperty("statusCode", 200);
  });
});

describe("get", () => {
  test("empty id", async () => {
    const event = {
      pathParameters: {
        id: "",
      },
    };

    const result = await get(event);

    expect(result).toHaveProperty("statusCode", 400);
    expect(result).toHaveProperty("body", "Invalid ID");
  });
});

describe("withLastName", () => {
  test("empty last name", async () => {
    const event = {
      pathParameters: {
        last_name: "",
      },
    };

    const result = await withLastName(event);

    expect(result).toHaveProperty("statusCode", 400);
    expect(result).toHaveProperty("body", "Invalid last name");
  });
});
