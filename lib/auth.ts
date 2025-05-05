import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";

import db from "./db/index";

export const auth = betterAuth({
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session") {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          });
        }
        return ctx.json(ctx.context.session);
      }
    }),
  },
  adapter: drizzleAdapter(db, {
    tableName: "users",
    fieldMapping: {
      username: "username",
      email: "email",
      password: "password",
    },
    provider: "sqlite",
    debugLogs: true,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
});
