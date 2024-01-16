if (!process.env.DATABASE_URL || typeof process.env.DATABASE_URL !== "string") {
  throw new Error("missing DATABASE_URL env");
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
} as const;
