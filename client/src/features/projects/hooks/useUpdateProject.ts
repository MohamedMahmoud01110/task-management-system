import { updateProjectApi } from "@/api/projects.api";
import type { UpdateProjectPayload } from "@/types/project.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<UpdateProjectPayload>;
    }) => updateProjectApi(id, payload),

    onSuccess: (_,Variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project-details",Variables.id ],
      });
    },
  });
}
