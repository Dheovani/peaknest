import { migrate } from "drizzle-orm/postgres-js/migrator";
import { createDatabase } from "../packages/database/src/index";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";

config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const { db, close } = createDatabase();
try {
  await migrate(db, { migrationsFolder: "./drizzle" });
} finally {
  await close();
}
