import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectDialog } from "./ProjectDialog";
import { useState } from "react";
import { useCreateProject } from "../hooks/useCreateProject";
import type { CreateProjectFormValues } from "../schemas/createProject.schema";

export function ProjectsHeader({ onCreate }: { onCreate: () => void }) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateProject();

  async function handleSubmit(values: CreateProjectFormValues) {
    setOpen(false);
    await mutate(values);
  }
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>

          <p className="text-slate-500">Manage your team's projects.</p>
        </div>

        <Button className="cursor-pointer" onClick={onCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      <ProjectDialog
        open={open}
        onOpenChange={setOpen}
        isPending={isPending}
        onSubmit={handleSubmit}
      />
    </>
  );
}
