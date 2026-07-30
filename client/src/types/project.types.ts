import type { User } from "./user.types";

export interface Project {
  _id: string;
  name: string;
  description?: string;

  owner: User;

  members: User[];

  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

export type UpdateProjectPayload = Partial<CreateProjectPayload>;
