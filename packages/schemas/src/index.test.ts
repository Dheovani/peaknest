import { describe, expect, it } from "vitest";
import {
  apiErrorSchema,
  healthResponseSchema,
  signInSchema,
  signUpSchema,
} from "./index";

describe("API boundary schemas", () => {
  it("accepts a versioned health response", () => {
    expect(
      healthResponseSchema.parse({ status: "ok", version: "v1" }).version,
    ).toBe("v1");
  });

  it("rejects an unknown API version", () => {
    expect(() =>
      healthResponseSchema.parse({ status: "ok", version: "v2" }),
    ).toThrow();
  });

  it("requires a request ID on errors", () => {
    expect(() =>
      apiErrorSchema.parse({
        error: { code: "BAD_REQUEST", message: "Invalid" },
      }),
    ).toThrow();
  });
});

describe("personal account input", () => {
  it("accepts a valid sign-in identity without a client supplied role", () => {
    expect(
      signInSchema.parse({ email: "person@example.com", password: "password" }),
    ).toEqual({ email: "person@example.com", password: "password" });
  });

  it("rejects malformed email, missing password and short registration passwords", () => {
    expect(
      signInSchema.safeParse({ email: "bad", password: "password" }).success,
    ).toBe(false);
    expect(
      signInSchema.safeParse({ email: "person@example.com", password: "" })
        .success,
    ).toBe(false);
    expect(
      signUpSchema.safeParse({
        name: "A",
        email: "person@example.com",
        password: "short",
      }).success,
    ).toBe(false);
  });

  it("trims a personal name and accepts an eight-character password", () => {
    expect(
      signUpSchema.parse({
        name: "  Ana  ",
        email: "ana@example.com",
        password: "password",
      }).name,
    ).toBe("Ana");
  });
});
