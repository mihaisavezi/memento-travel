import { Resend } from "resend";

import env from "./env";

export const resend = new Resend(env.MAILER_API_KEY);
