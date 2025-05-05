import { z } from "zod";

import { auth } from "~/lib/auth";

const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const { username, email, password } = registerSchema.parse(body);

    // Create user account using auth handler
    const user = await auth.api.signUpEmail({
      body: {
        name: username,
        email,
        password,
      },
      headers: event.headers,
    });

    if (!user) {
      throw createError({
        statusCode: 400,
        message: "Registration failed",
      });
    }

    return { success: true };
  }
  catch (err) {
    if (err instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: "Invalid input data",
        data: err.errors,
      });
    }

    throw createError({
      statusCode: 500,
      message: "Registration failed. Please try again.",
    });
  }
});
