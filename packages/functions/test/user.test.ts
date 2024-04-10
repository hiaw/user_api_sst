import { isValidUser } from "../src/user";
import { describe, expect, test } from "vitest";

describe("Is valid user", () => {
  const first_name = "John";
  const last_name = "Doe";
  const email = "john@doe.com";

  test("valid input", () => {
    expect(isValidUser({ email, first_name, last_name })).toBeTruthy();
  });

  test("invalid email format", () => {
    expect(isValidUser({ email: "abc@a", first_name, last_name })).toBeFalsy();
    expect(isValidUser({ email: "abc", first_name, last_name })).toBeFalsy();
    expect(isValidUser({ email: "@z.com", first_name, last_name })).toBeFalsy();
  });

  test("empty names", () => {
    expect(isValidUser({ email, first_name: "", last_name })).toBeFalsy();
    expect(isValidUser({ email, first_name, last_name: "" })).toBeFalsy();
  });
});
