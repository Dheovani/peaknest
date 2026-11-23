import { z } from "zod";

export const databaseEnvSchema = z.object({
  DATABASE_URL: z.url().startsWith("postgresql://"),
});

export const serverEnvSchema = databaseEnvSchema.extend({
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
});

export function parseServerEnv(env: Record<string, string | undefined>) {
  return serverEnvSchema.parse(env);
}

export function parseDatabaseEnv(env: Record<string, string | undefined>) {
  return databaseEnvSchema.parse(env);
}
