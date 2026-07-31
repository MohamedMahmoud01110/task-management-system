import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must contain at least 3 characters").max(100),

  description: z.string().optional(),

  status: z.enum(["todo", "in_progress", "done"]),

  priority: z.enum(["low", "medium", "high"]),

  dueDate: z.string().min(1, "Due date is required"),

  assignee: z.string().min(1, "Please choose an assignee"),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
