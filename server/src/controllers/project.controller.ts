import { Request, Response, NextFunction } from "express";
import * as projectService from "../services/project.service";
import { success } from "zod";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.createProject(
      req.body,
      req.user!.userId,
    );
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
}
export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const projects = await projectService.getUserProjects(
      req.user!.userId,
      req.user!.role,
    );
    res.status(200).json({ success: true, total: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.getProjectById(
      req.params.id as string,
      req.user!.userId,
      req.user!.role,
    );
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.updateProject(
      req.params.id as string,
      req.user!.userId,
      req.user!.role,
      req.body,
    );
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await projectService.deleteProject(
      req.params.id as string,
      req.user!.userId,
      req.user!.role,
    );
    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    next(err);
  }
}

export async function addMember(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const project = await projectService.addMember(
      req.params.id as string,
      req.user!.userId,
      req.user!.role,
      req.body.userId,
    );
    res.status(200).json({
      success: true,
      message: "Member added successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
}

export async function removeMember(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const project = await projectService.removeMember(
      req.params.id as string,
      req.user!.userId,
      req.user!.role,
      req.params.userId as string,
    );
    res.status(200).json({ success: true, message: "Member removed successfully", data: project });
  } catch (err) {
    next(err);
  }
}
