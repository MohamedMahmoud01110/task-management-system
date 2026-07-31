import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskApi } from "../../../api/tasks.api";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, payload }: { projectId: string; payload: any }) =>
      createTaskApi(projectId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      });
    },
  });
}
