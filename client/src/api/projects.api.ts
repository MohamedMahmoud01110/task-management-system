import axiosClient from "./axiosClient";
import type {
  Project,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/types/project.types";
import type { ApiResponse } from "@/types/api.types";

export interface ProjectsQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "newest" | "oldest";
}

export interface PaginatedProjectsResponse {
  data: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getProjectsApi(
  query: ProjectsQuery,
): Promise<PaginatedProjectsResponse> {
  const res = await axiosClient.get("/projects", {
    params: query,
  });

  return res.data;
}

export async function getProjectByIdApi(projectId: string): Promise<Project> {
  const res = await axiosClient.get<ApiResponse<Project>>(
    `/projects/${projectId}`,
  );
  return res.data.data;
}

export async function createProjectApi(
  payload: CreateProjectPayload,
): Promise<Project> {
  const res = await axiosClient.post<ApiResponse<Project>>(
    "/projects",
    payload,
  );
  return res.data.data;
}

export async function updateProjectApi(
  id: string,
  payload: UpdateProjectPayload,
): Promise<Project> {
  const res = await axiosClient.patch<ApiResponse<Project>>(
    `/projects/${id}`,
    payload,
  );
  return res.data.data;
}

export async function deleteProjectApi(id: string): Promise<void> {
  await axiosClient.delete(`/projects/${id}`);
}

export async function addMemberApi(
  projectId: string,
  email: string,
): Promise<Project> {
  const res = await axiosClient.post(`/projects/${projectId}/members`, {
    email,
  });

  return res.data.data;
}
export async function removeMemberApi(
  projectId: string,
  userId: string,
): Promise<Project> {
  const res = await axiosClient.delete<ApiResponse<Project>>(
    `/projects/${projectId}/members/${userId}`,
  );
  return res.data.data;
}
