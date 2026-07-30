import { createProjectApi } from "@/api/projects.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProjectApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
