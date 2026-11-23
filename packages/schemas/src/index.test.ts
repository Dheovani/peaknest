import { describe, expect, it } from "vitest";
import { apiErrorSchema, healthResponseSchema } from "./index";

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
