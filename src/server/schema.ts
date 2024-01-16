import { sql } from "drizzle-orm";
import { pgTable, timestamp, text, integer, uuid } from "drizzle-orm/pg-core";

export const views = pgTable("views", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  slug: text("slug").notNull(),
  count: integer("count").default(0).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
