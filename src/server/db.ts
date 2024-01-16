import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "~/server/schema";
import { env } from "~/lib/env";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });
