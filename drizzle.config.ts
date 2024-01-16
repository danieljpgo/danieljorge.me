import type { Config } from "drizzle-kit";
import { env } from "~/lib/env";

export default {
  schema: "./src/server/schema.ts",
  out: "./src/server/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  strict: true,
} satisfies Config;
