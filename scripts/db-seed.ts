import { createDatabase } from "../packages/database/src/index";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { sql } from "drizzle-orm";

config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const { db, close } = createDatabase();
try {
  await db.execute(sql`select 1`);
  process.stdout.write("No seed records are defined for the foundation.\n");
} finally {
  await close();
}
