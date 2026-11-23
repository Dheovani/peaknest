import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { createDatabase } from "@fitness/database";
import { parseServerEnv } from "@fitness/config/env";
import { betterAuth } from "better-auth";
import * as schema from "@fitness/database/schema";

export function createAuth(
  env: NodeJS.ProcessEnv = process.env,
  database?: ReturnType<typeof createDatabase>["db"],
) {
  const { BETTER_AUTH_SECRET, BETTER_AUTH_URL } = parseServerEnv(env);
  const db = database ?? createDatabase(env).db;

  return betterAuth({
    database: drizzleAdapter(db, { provider: "pg", schema }),
    secret: BETTER_AUTH_SECRET,
    baseURL: BETTER_AUTH_URL,
    emailAndPassword: { enabled: true, minPasswordLength: 8 },
    rateLimit: {
      enabled: true,
      window: 60,
      max: 100,
      customRules: { "/sign-in/email": { window: 60, max: 5 } },
    },
  });
}

let authInstance: ReturnType<typeof createAuth> | undefined;

export function getAuth() {
  authInstance ??= createAuth();
  return authInstance;
}
