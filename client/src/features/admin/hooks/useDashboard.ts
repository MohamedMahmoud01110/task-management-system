import { useQuery } from "@tanstack/react-query";
import { getDashboardApi } from "../../../api/admin.api";

export function useDashboard() {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getDashboardApi,
  });
}
