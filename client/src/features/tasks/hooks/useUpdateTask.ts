import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskApi } from "../../../api/tasks.api";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      taskId,
      payload,
    }: {
      projectId: string;
      taskId: string;
      payload: any;
    }) => updateTaskApi(projectId, taskId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      });
    },
  });
}
