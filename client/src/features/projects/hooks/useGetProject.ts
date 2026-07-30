import { getProjectByIdApi } from "@/api/projects.api";
import { useQuery } from "@tanstack/react-query";

export function useGetProject(projectId: string) {
  return useQuery({
    queryKey: ["project-details", projectId],
    queryFn: () => getProjectByIdApi(projectId),
    enabled: !!projectId,
  });
}