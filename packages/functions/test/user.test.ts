import { isValidUser } from "../src/user";
import { describe, expect, test } from "vitest";

describe("Is valid user", () => {
  const firstName = "John";
  const lastName = "Doe";
  const email = "john@doe.com";

  test("valid input", () => {
    expect(isValidUser({ email, firstName, lastName })).toBeTruthy();
  });

  test("invalid email format", () => {
    expect(isValidUser({ email: "abc@a", firstName, lastName })).toBeFalsy();
    expect(isValidUser({ email: "abc", firstName, lastName })).toBeFalsy();
    expect(isValidUser({ email: "@z.com", firstName, lastName })).toBeFalsy();
  });

  test("empty names", () => {
    expect(isValidUser({ email, firstName: "", lastName })).toBeFalsy();
    expect(isValidUser({ email, firstName, lastName: "" })).toBeFalsy();
  });
});
