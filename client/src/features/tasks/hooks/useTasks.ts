import { useQuery } from "@tanstack/react-query";
import { getTasksApi } from "../../../api/tasks.api";
import type { TaskFilters } from "@/types/task.types";

export function useTasks(
  projectId: string,
  filters?: TaskFilters,
) {
  return useQuery({
    queryKey: ["tasks", projectId, filters],
    queryFn: () => getTasksApi(projectId, filters),
    enabled: !!projectId,
  });
}
