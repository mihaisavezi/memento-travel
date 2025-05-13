import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

// Schema for each section
const sectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  tags: z.array(z.string()),
});

// Complete resume schema
const resumeSchema = z.object({
  sections: z.array(sectionSchema),
});

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "data",
      source: "**/*.json",
      schema: resumeSchema,
    }),
  },
});
