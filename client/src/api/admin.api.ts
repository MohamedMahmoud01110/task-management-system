import axiosClient from "@/api/axiosClient";
import type { ApiResponse } from "@/types/api.types";
import type { DashboardStats } from "../types/admin.types";

export async function getDashboardApi(): Promise<DashboardStats> {
  const res = await axiosClient.get<ApiResponse<DashboardStats>>(
    "/admin/dashboard",
  );

  return res.data.data;
}