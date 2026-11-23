import { describe, expect, it } from "vitest";
import postgres from "postgres";

describe("PostgreSQL foundation", () => {
  it("connects to the disposable test database", async () => {
    const url = process.env.TEST_DATABASE_URL;
    if (!url)
      throw new Error("TEST_DATABASE_URL is required for integration tests");
    const connection = postgres(url);
    try {
      const result = await connection`select 1 as value`;
      expect(result[0]?.value).toBe(1);
    } finally {
      await connection.end();
    }
  });
});
