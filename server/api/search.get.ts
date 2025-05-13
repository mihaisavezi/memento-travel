import { z } from "zod";

import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";
import sendZodError from "~/utils/send-zod-error";

const searchSchema = z.object({
  q: z.string().min(1),
});

export default defineAuthenticatedEventHandler(
  defineCachedEventHandler(async (event) => {
    const result = await getValidatedQuery(event, searchSchema.safeParse);

    if (!result.success) {
      return sendZodError(event, result.error);
    }

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${result.data.q}&format=json`, {
        signal: AbortSignal.timeout(5000),
        headers: {
          "User-Agent": "memento-travel | mihai.ppscu@gmail.com",
        },
      });

      if (!response.ok) {
        return sendError(event, createError({
          statusCode: 504,
          statusMessage: "Unable to reach search API",
        }));
      }

      const results = await response.json();
      return results;
    }
    catch {
      return sendError(event, createError({
        statusCode: 504,
        statusMessage: "Unable to reach search API",
      }));
    }
  }, {
    maxAge: 86400, // 1 day
    name: "search-nominatim-api",
    getKey: async (event) => {
      const query = await getQuery(event);
      return query.q?.toString() || "";
    },
  }),
);
