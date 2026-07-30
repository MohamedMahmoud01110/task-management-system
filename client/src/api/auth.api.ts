import axiosClient from "./axiosClient";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "@/types/auth.types";
import type { ApiResponse } from "@/types/api.types";

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  const res = await axiosClient.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    payload,
  );
  return res.data.data;
}

export async function registerApi(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const res = await axiosClient.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    payload,
  );
  return res.data.data;
}
