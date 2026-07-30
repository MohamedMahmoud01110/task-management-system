export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  total?: number;
  data: T;
}
