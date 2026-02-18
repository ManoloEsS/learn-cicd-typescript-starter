import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("person object", () => {
  const person = {
    isActive: true,
    age: 32,
  };

  test("should be defined", () => {
    expect(person).toBeDefined();
  });

  test("should have active set to true", () => {
    expect(person.isActive).toBe(true);
  });

  test("should have age as a number", () => {
    expect(person.age).toBeTypeOf("number");
  });
});

describe("getAPIKey", () => {
  test("should extract API key from authorization header", () => {
    const header: IncomingHttpHeaders = {
      authorization: "ApiKey 123",
    };

    expect(getAPIKey(header)).toBe("123");
  });

  test("should split header in two parts and returns second part", () => {
    const header: IncomingHttpHeaders = {
      authorization: "ApiKey part2",
    };
    expect(getAPIKey(header)).toBe("part2");
  });

  test("should return null when no authorization field", () => {
    const header: IncomingHttpHeaders = {};
    expect(getAPIKey(header)).toBeNull();
  });

  test("should return null when authorization header does not contain ApiKey", () => {
    const header: IncomingHttpHeaders = {
      authorization: "noApiKey 123",
    };
    expect(getAPIKey(header)).toBeNull();
  });

  test("should return second item when split auth's length > 2", () => {
    const header: IncomingHttpHeaders = {
      authorization: "ApiKey 456 457",
    };
    expect(getAPIKey(header)).toBe("456");
  });
});
