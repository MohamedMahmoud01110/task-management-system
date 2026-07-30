import { z } from "zod";
import { TaskStatus } from "../enums/TaskStatus";
import { TaskPriority } from "../enums/TaskPriority";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(150, "Title must be at most 150 characters"),
  description: z.string().trim().max(1000).optional(),
  status: z
    .enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    .optional(),
  priority: z
    .enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH])
    .optional(),
  dueDate: z.coerce.date().optional(),
  assignee: objectId.optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const taskFilterSchema = z.object({
  status: z
    .enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    .optional(),
  priority: z
    .enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH])
    .optional(),
  assignee: objectId.optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskFilterInput = z.infer<typeof taskFilterSchema>;
