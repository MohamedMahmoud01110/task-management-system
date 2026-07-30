import axiosClient from "./axiosClient";
import type {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskFilters,
} from "@/types/task.types";
import type { ApiResponse } from "@/types/api.types";

export async function getTasksApi(
  projectId: string,
  filters?: TaskFilters,
): Promise<Task[]> {
  const res = await axiosClient.get<ApiResponse<Task[]>>(
    `/projects/${projectId}/tasks`,
    {
      params: filters,
    },
  );
  return res.data.data;
}

export async function getTaskByIdApi(
  projectId: string,
  taskId: string,
): Promise<Task> {
  const res = await axiosClient.get<ApiResponse<Task>>(
    `/projects/${projectId}/tasks/${taskId}`,
  );
  return res.data.data;
}

export async function createTaskApi(
  projectId: string,
  payload: CreateTaskPayload,
): Promise<Task> {
  const res = await axiosClient.post<ApiResponse<Task>>(
    `/projects/${projectId}/tasks`,
    payload,
  );
  return res.data.data;
}

export async function updateTaskApi(
  projectId: string,
  taskId: string,
  payload: UpdateTaskPayload,
): Promise<Task> {
  const res = await axiosClient.patch<ApiResponse<Task>>(
    `/projects/${projectId}/tasks/${taskId}`,
    payload,
  );
  return res.data.data;
}

export async function deleteTaskApi(
  projectId: string,
  taskId: string,
): Promise<void> {
  await axiosClient.delete(`/projects/${projectId}/tasks/${taskId}`);
}
