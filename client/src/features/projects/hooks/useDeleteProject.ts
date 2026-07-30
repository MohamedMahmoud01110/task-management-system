import { deleteProjectApi } from "@/api/projects.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => deleteProjectApi(projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
