import { create } from "../src/handler";
import { describe, expect, test } from "vitest";

describe("create user", () => {
  const firstname = "John";
  const lastname = "Doe";
  const email = "john@doe.com";

  // test("valid input", async () => {
  //   const event = { body: JSON.stringify({ email, firstname, lastname }) };
  //
  //   const result = await create(event);
  //
  //   expect(result).toEqual({
  //     statusCode: 200,
  //     body: `Successfully created user ${firstname} ${lastname}`,
  //   });
  // });

  test("invalid input", async () => {
    const event = {
      body: JSON.stringify({ email, firstName: firstname, lastname }),
    };

    const result = await create(event, null, null);

    expect(result).toEqual({
      statusCode: 400,
      body: "Invalid input",
    });
  });
});
