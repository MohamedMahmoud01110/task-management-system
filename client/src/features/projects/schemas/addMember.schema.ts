import { z } from "zod";

export const addMemberSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
});

export type AddMemberFormValues = z.infer<typeof addMemberSchema>;
