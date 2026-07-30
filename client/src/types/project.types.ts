import type { User } from "./user.types";

export interface Project {
  _id: string;
  name: string;
  description?: string;
  owner: User | string;
  members: User[] | string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}

export type UpdateProjectPayload = Partial<CreateProjectPayload>;
