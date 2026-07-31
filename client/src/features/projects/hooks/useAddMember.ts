import { addMemberApi } from "@/api/projects.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, email }: { projectId: string; email: string }) =>
      addMemberApi(projectId, email),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project-details", variables.projectId],
      });
    },
  });
}
