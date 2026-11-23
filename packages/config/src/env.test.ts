import { describe, expect, it } from "vitest";
import { parseDatabaseEnv, parseServerEnv } from "./env";

describe("parseServerEnv", () => {
  it("accepts complete server configuration", () => {
    expect(
      parseServerEnv({
        DATABASE_URL: "postgresql://localhost:5432/fitness",
        BETTER_AUTH_SECRET: "x".repeat(32),
        BETTER_AUTH_URL: "http://localhost:3000",
      }).BETTER_AUTH_URL,
    ).toBe("http://localhost:3000");
  });

  it("rejects missing secrets", () => {
    expect(() =>
      parseServerEnv({
        DATABASE_URL: "postgresql://localhost:5432/fitness",
        BETTER_AUTH_URL: "http://localhost:3000",
      }),
    ).toThrow();
  });

  it("allows database tooling without an auth secret", () => {
    expect(
      parseDatabaseEnv({ DATABASE_URL: "postgresql://localhost:5432/fitness" })
        .DATABASE_URL,
    ).toBe("postgresql://localhost:5432/fitness");
  });
});
