import { Task } from "../models/task.model";
import { Project } from "../models/project.model";
import { AppError } from "../utils/AppError";
import {
  CreateTaskInput,
  UpdateTaskInput,
  TaskFilterInput,
} from "../validators/task.validator";
import { Types } from "mongoose";

async function ensureProjectAccess(
  projectId: string,
  userId: string,
  userRole: string,
) {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const isMember = project.members.some((m) => m.toString() === userId);
  const isAdmin = userRole === "admin";

  if (!isMember && !isAdmin) {
    throw new AppError("You do not have access to this project", 403);
  }

  return project;
}

export async function createTask(
  projectId: string,
  userId: string,
  userRole: string,
  input: CreateTaskInput,
) {
  const project = await ensureProjectAccess(projectId, userId, userRole);

  if (input.assignee) {
    const isAssigneeMember = project.members.some(
      (m) => m.toString() === input.assignee,
    );
    if (!isAssigneeMember) {
      throw new AppError("Assignee must be a member of the project", 400);
    }
  }

  const task = await Task.create({
    title: input.title,
    description: input.description || "",
    status: input.status,
    priority: input.priority,
    dueDate: input.dueDate,
    project: projectId,
    creator: userId,
    assignee: input.assignee ? new Types.ObjectId(input.assignee) : undefined,
  });

  return task;
}

export async function getProjectTasks(
  projectId: string,
  userId: string,
  userRole: string,
  filters: TaskFilterInput & {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
  },
) {
  await ensureProjectAccess(projectId, userId, userRole);

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const query: Record<string, unknown> = {
    project: projectId,
  };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }

  if (filters.assignee) {
    query.assignee = filters.assignee;
  }

  if (filters.search) {
    query.title = {
      $regex: filters.search,
      $options: "i",
    };
  }

  let sort: Record<string, 1 | -1> = {
    createdAt: -1,
  };

  switch (filters.sort) {
    case "oldest":
      sort = { createdAt: 1 };
      break;

    case "dueDate":
      sort = { dueDate: 1 };
      break;

    case "priority":
      sort = { priority: -1 };
      break;

    default:
      sort = { createdAt: -1 };
  }

  const [tasks, total] = await Promise.all([
    Task.find(query)
      .populate("creator", "name email")
      .populate("assignee", "name email")
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Task.countDocuments(query),
  ]);

  return {
    data: tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getTaskById(
  projectId: string,
  taskId: string,
  userId: string,
  userRole: string,
) {
  await ensureProjectAccess(projectId, userId, userRole);

  const task = await Task.findOne({ _id: taskId, project: projectId })
    .populate("creator", "name email")
    .populate("assignee", "name email");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
}

export async function updateTask(
  projectId: string,
  taskId: string,
  userId: string,
  userRole: string,
  input: UpdateTaskInput,
) {
  const project = await ensureProjectAccess(projectId, userId, userRole);

  const task = await Task.findOne({ _id: taskId, project: projectId });
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (input.assignee) {
    const isAssigneeMember = project.members.some(
      (m) => m.toString() === input.assignee,
    );
    if (!isAssigneeMember) {
      throw new AppError("Assignee must be a member of the project", 400);
    }
  }

  if (input.title !== undefined) task.title = input.title;
  if (input.description !== undefined) task.description = input.description;
  if (input.status !== undefined) task.status = input.status;
  if (input.priority !== undefined) task.priority = input.priority;
  if (input.dueDate !== undefined) task.dueDate = input.dueDate;
  if (input.assignee !== undefined) task.assignee = input.assignee as any;

  await task.save();
  return task;
}

export async function deleteTask(
  projectId: string,
  taskId: string,
  userId: string,
  userRole: string,
) {
  await ensureProjectAccess(projectId, userId, userRole);

  const task = await Task.findOne({ _id: taskId, project: projectId });
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  await task.deleteOne();
}
