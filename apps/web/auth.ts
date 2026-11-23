import { config } from "dotenv";
import { createAuth } from "./lib/auth";

config({ path: "../../.env" });

export const auth = createAuth();
