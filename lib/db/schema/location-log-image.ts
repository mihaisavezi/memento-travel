import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { locationLog } from "./location-log";

export const locationLogImage = sqliteTable("locationLogImage", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  startedAt: int().notNull().$default(() => Date.now()),
  endedAt: int().notNull().$default(() => Date.now()),
  locationLogId: int().notNull().references(() => locationLog.id),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
