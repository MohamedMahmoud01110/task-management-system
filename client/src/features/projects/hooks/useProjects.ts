import { getProjectsApi, type ProjectsQuery } from "@/api/projects.api";
import { useQuery } from "@tanstack/react-query";

export function useProjects(query: ProjectsQuery) {
  return useQuery({
    
    queryKey: ["projects", query],
    queryFn: () => getProjectsApi(query),
  });
}
