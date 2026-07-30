import { Project } from "../models/project.model";
import { AppError } from "../utils/AppError";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../validators/project.validator";
import { Types } from "mongoose";

export async function createProject(
  input: CreateProjectInput,
  ownerId: string,
) {
  const project = await Project.create({
    name: input.name,
    description: input.description || "",
    owner: ownerId,
    members: [ownerId], // The project owner is automatically included in the members list
  });

  return project;
}

export async function getUserProjects(userId: string, userRole: string) {
  const filter = userRole === "admin" ? {} : { members: userId };
  const projects = await Project.find(filter).populate("owner", "name email");
  return projects;
}
export async function getProjectById(
  projectId: string,
  userId: string,
  userRole: string,
) {
  const project = await Project.findById(projectId)
    .populate("owner", "name email")
    .populate("members", "name email");

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const isMember = project.members.some((m) => m._id.toString() === userId);
  const isAdmin = userRole === "admin";

  if (!isMember && !isAdmin) {
    throw new AppError("You do not have access to this project", 403);
  }

  return project;
}

export async function updateProject(
  projectId: string,
  userId: string,
  userRole: string,
  input: UpdateProjectInput,
) {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const isOwner = project.owner.toString() === userId;
  const isAdmin = userRole === "admin";

  if (!isOwner && !isAdmin) {
    throw new AppError(
      "Only the project owner or an admin can update this project",
      403,
    );
  }

  if (input.name !== undefined) project.name = input.name;
  if (input.description !== undefined) project.description = input.description;

  await project.save();
  return project;
}

export async function deleteProject(
  projectId: string,
  userId: string,
  userRole: string,
) {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const isOwner = project.owner.toString() === userId;
  const isAdmin = userRole === "admin";

  if (!isOwner && !isAdmin) {
    throw new AppError(
      "Only the project owner or an admin can delete this project",
      403,
    );
  }

  await project.deleteOne();
}

export async function addMember(
  projectId: string,
  requesterId: string,
  requesterRole: string,
  memberIdToAdd: string,
) {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const isOwner = project.owner.toString() === requesterId;
  const isAdmin = requesterRole === "admin";
  if (!isOwner && !isAdmin) {
    throw new AppError(
      "Only the project owner or an admin can add members",
      403,
    );
  }

  const alreadyMember = project.members.some(
    (m) => m.toString() === memberIdToAdd,
  );
  if (alreadyMember) {
    throw new AppError("User is already a member of this project", 409);
  }

  project.members.push(new Types.ObjectId(memberIdToAdd));
  await project.save();
  return project;
}

export async function removeMember(
  projectId: string,
  requesterId: string,
  requesterRole: string,
  memberIdToRemove: string,
) {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const isOwner = project.owner.toString() === requesterId;
  const isAdmin = requesterRole === "admin";
  if (!isOwner && !isAdmin) {
    throw new AppError(
      "Only the project owner or an admin can remove members",
      403,
    );
  }

  if (memberIdToRemove === project.owner.toString()) {
    throw new AppError("Cannot remove the project owner from members", 400);
  }

  project.members = project.members.filter(
    (m) => m.toString() !== memberIdToRemove,
  );
  await project.save();
  return project;
}
