import { removeMemberApi } from "@/api/projects.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      memberId,
    }: {
      projectId: string;
      memberId: string;
    }) => removeMemberApi(projectId, memberId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project-details"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project-members"],
      });
    },
  });
}
