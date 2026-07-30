import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(50),

  email: z.email("Please enter a valid email address").trim(),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
