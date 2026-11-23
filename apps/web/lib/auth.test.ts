import { afterEach, describe, expect, it, vi } from "vitest";
import { createDatabase } from "@peaknest/database";
import { createAuth, getAuth } from "./auth";

const mocks = vi.hoisted(() => ({
  createDatabase: vi.fn(() => ({ db: { kind: "db" } })),
  drizzleAdapter: vi.fn(() => ({ kind: "adapter" })),
  betterAuth: vi.fn(() => ({ handler: vi.fn() })),
}));

vi.mock("@peaknest/database", () => ({ createDatabase: mocks.createDatabase }));
vi.mock("@peaknest/database/schema", () => ({ user: { kind: "user-table" } }));
vi.mock("@better-auth/drizzle-adapter", () => ({
  drizzleAdapter: mocks.drizzleAdapter,
}));
vi.mock("better-auth", () => ({ betterAuth: mocks.betterAuth }));

const env = {
  NODE_ENV: "test" as const,
  DATABASE_URL: "postgresql://fitness:fitness@localhost:5432/fitness",
  BETTER_AUTH_SECRET: "a".repeat(32),
  BETTER_AUTH_URL: "http://localhost:3000",
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("server authentication configuration", () => {
  it("rejects missing credentials before opening a database", () => {
    expect(() => createAuth({ NODE_ENV: "test" })).toThrow();
    expect(mocks.createDatabase).not.toHaveBeenCalled();
  });

  it("configures PostgreSQL sessions and sign-in rate limiting", () => {
    createAuth(env);
    expect(mocks.createDatabase).toHaveBeenCalledWith(env);
    expect(mocks.drizzleAdapter).toHaveBeenCalledWith(
      { kind: "db" },
      expect.objectContaining({ provider: "pg" }),
    );
    expect(mocks.betterAuth).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: "http://localhost:3000",
        secret: env.BETTER_AUTH_SECRET,
        emailAndPassword: { enabled: true, minPasswordLength: 8 },
        rateLimit: expect.objectContaining({ enabled: true }),
      }),
    );
  });

  it("uses an injected database for isolated integration work", () => {
    const injected = createDatabase(env).db;
    mocks.createDatabase.mockClear();
    createAuth(env, injected);
    expect(mocks.createDatabase).not.toHaveBeenCalled();
    expect(mocks.drizzleAdapter).toHaveBeenCalledWith(
      { kind: "db" },
      expect.objectContaining({ provider: "pg" }),
    );
  });

  it("creates one server auth instance lazily", () => {
    vi.stubEnv("DATABASE_URL", env.DATABASE_URL);
    vi.stubEnv("BETTER_AUTH_SECRET", env.BETTER_AUTH_SECRET);
    vi.stubEnv("BETTER_AUTH_URL", env.BETTER_AUTH_URL);
    const first = getAuth();
    expect(getAuth()).toBe(first);
    expect(mocks.betterAuth).toHaveBeenCalledTimes(1);
  });
});
