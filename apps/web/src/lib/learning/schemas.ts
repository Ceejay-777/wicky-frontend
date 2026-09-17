import { z } from "zod";

export const subjectCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Subject name is required.")
    .max(200, "200 characters max."),
});

export type SubjectCreateValues = z.infer<typeof subjectCreateSchema>;
