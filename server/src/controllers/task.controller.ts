import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/task.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await taskService.createTask(
      req.params.projectId as string,
      req.user!.userId,
      req.user!.role,
      req.body,
    );
    res
      .status(201)
      .json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
  } catch (err) {
    next(err);
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = (req as any).validatedQuery || {};
    const tasks = await taskService.getProjectTasks(
      req.params.projectId as string,
      req.user!.userId,
      req.user!.role,
      filters,
    );
    res.status(200).json({ success: true, total: tasks.length, data: tasks });
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await taskService.getTaskById(
      req.params.projectId as string,
      req.params.taskId as string,
      req.user!.userId,
      req.user!.role,
    );
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await taskService.updateTask(
      req.params.projectId as string,
      req.params.taskId as string,
      req.user!.userId,
      req.user!.role,
      req.body,
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Task updated successfully",
        data: task,
      });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await taskService.deleteTask(
      req.params.projectId as string,
      req.params.taskId as string,
      req.user!.userId,
      req.user!.role,
    );
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
}
