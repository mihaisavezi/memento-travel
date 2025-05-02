import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  event.context.user = session
    ? { ...session.user, id: Number.parseInt(session.user.id, 10) }
    : undefined;

  if (event.path.startsWith("/dashboard")) {
    if (!session) {
      await sendRedirect(event, "/", 302);
    }
  }
});
