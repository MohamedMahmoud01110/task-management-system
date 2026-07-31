import { UserRole } from "../enums/UserRole";
import { Project } from "../models/project.model";
import { User } from "../models/user.model";
import { AppError } from "../utils/AppError";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../validators/project.validator";

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

export async function getUserProjects(
  userId: string,
  userRole: string,
  query: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
  },
) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};

  if (userRole !== "admin") {
    filter.members = userId;
  }

  if (query.search) {
    filter.name = {
      $regex: query.search,
      $options: "i",
    };
  }

  const sort =
    query.sort === "oldest"
      ? { createdAt: 1 as const }
      : { createdAt: -1 as const };
  const [projects, total] = await Promise.all([
    Project.find(filter)
      .populate("owner", "name email")
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Project.countDocuments(filter),
  ]);

  return {
    data: projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
  memberEmail: string,
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

  const user = await User.findOne({ email: memberEmail });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.role !== UserRole.MEMBER) {
    throw new AppError("User is not a member of this project", 409);
  }

  const alreadyMember = project.members.some(
    (m) => m._id.toString() === user._id.toString(),
  );
  if (alreadyMember) {
    throw new AppError("User is already a member of this project", 409);
  }

  project.members.push(user._id);
  await project.save();
  return project;
}

export async function getMembers(
  projectId: string,
  userId: string,
  userRole: string,
) {
  const project = await getProjectById(projectId, userId, userRole);
  return project.members;
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
