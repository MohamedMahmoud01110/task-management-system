import { getProjectsApi } from "@/api/projects.api";
import { useQuery } from "@tanstack/react-query";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsApi,
  });
}
