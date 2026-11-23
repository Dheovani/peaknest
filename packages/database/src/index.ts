import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { parseDatabaseEnv } from "@fitness/config/env";
import * as schema from "./schema";

export function createDatabase(env: NodeJS.ProcessEnv = process.env) {
  const { DATABASE_URL } = parseDatabaseEnv(env);
  const connection = postgres(DATABASE_URL);
  return { db: drizzle(connection, { schema }), close: () => connection.end() };
}
