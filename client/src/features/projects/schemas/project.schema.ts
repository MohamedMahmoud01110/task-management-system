import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().trim().min(3, "Project name is required").max(50),

  description: z.string().trim().max(300).optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
