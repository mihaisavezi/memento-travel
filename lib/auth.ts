import type { User } from "better-auth";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { magicLink } from "better-auth/plugins";

import db from "./db/index";
import env from "./env";
import { resend } from "./mailing";

export type UserWithId = Omit<User, "id"> & {
  id: number;
};

export const auth = betterAuth({
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        // send email to user

        try {
          await resend.emails.send({
            from: "Mihai <onboarding@memento-travel.dev>",
            to: [email],
            subject: "Welcome",
            html: `<strong>It works! 
            Click on this link: <a href="${url}"> MementoTravel </a>
            <ul>  There is a lot you can do: 
            <li>Add a location, by searching on the map, or just dragging the pin, or just search it via API</li>
            <li>Browse locations</li>
            <li>Toggle Light Mode/Dark Mode</li>
            <li>More features soon to come...</li>
            </ul>`,
          });
        }
        catch (error) {
          console.log(error);
        }
      },
    }),
  ],
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
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
    debugLogs: true,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    },
  },
});
