import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { createAuth } from "../../apps/web/lib/auth";
import { createDatabase } from "../../packages/database/src/index";
import { user } from "../../packages/database/src/auth-schema";

describe("PostgreSQL-backed authentication", () => {
  it("persists a personal account, checks credentials and revokes its session", async () => {
    const databaseUrl = process.env.TEST_DATABASE_URL;
    if (!databaseUrl)
      throw new Error("TEST_DATABASE_URL is required for integration tests");

    const baseURL = "http://localhost:3000";
    const email = `auth-integration-${randomUUID()}@example.test`;
    const password = "integration-password-123";
    const database = createDatabase({ DATABASE_URL: databaseUrl });
    const auth = createAuth(
      {
        DATABASE_URL: databaseUrl,
        BETTER_AUTH_SECRET: "integration-only-secret-at-least-32-chars",
        BETTER_AUTH_URL: baseURL,
      },
      database.db,
    );

    async function request(
      path: string,
      body?: Record<string, string>,
      cookie?: string,
    ) {
      const headers = new Headers();
      if (body) {
        headers.set("content-type", "application/json");
        headers.set("origin", baseURL);
      }
      if (cookie) headers.set("cookie", cookie);
      return auth.handler(
        new Request(`${baseURL}/api/auth/${path}`, {
          method: body ? "POST" : "GET",
          headers,
          ...(body ? { body: JSON.stringify(body) } : {}),
        }),
      );
    }

    try {
      const registration = await request("sign-up/email", {
        name: "Integration User",
        email,
        password,
      });
      expect(registration.status).toBe(200);
      const cookie = registration.headers.get("set-cookie")?.split(";")[0];
      expect(cookie).toContain("session_token");

      const session = await request("get-session", undefined, cookie);
      expect((await session.json()).user.email).toBe(email);

      const denied = await request("sign-in/email", {
        email,
        password: "wrong-password",
      });
      expect(denied.status).toBe(401);

      const signOut = await request("sign-out", {}, cookie);
      expect(signOut.status).toBe(200);
      const afterSignOut = await request("get-session", undefined, cookie);
      expect(await afterSignOut.json()).toBeNull();

      const login = await request("sign-in/email", { email, password });
      expect(login.status).toBe(200);
    } finally {
      await database.db.delete(user).where(eq(user.email, email));
      await database.close();
    }
  });
});
