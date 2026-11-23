import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

describe("createDatabase", () => {
  it("rejects missing server configuration before creating a connection", async () => {
    const { createDatabase } = await import("./index");
    expect(() => createDatabase({})).toThrow();
  });

  it("creates a lazy PostgreSQL adapter and closes it", async () => {
    const { createDatabase } = await import("./index");
    const adapter = createDatabase({
      DATABASE_URL: "postgresql://fitness:fitness@localhost:5432/fitness",
      BETTER_AUTH_SECRET: "x".repeat(32),
      BETTER_AUTH_URL: "http://localhost:3000",
    });
    expect(adapter.db).toBeDefined();
    await adapter.close();
  });
});
