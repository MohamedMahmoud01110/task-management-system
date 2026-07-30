import { useState } from "react";

import usePageTitle from "@/shared/usePageTitle";
import { DashboardLayout } from "@/layouts/DashboardLayout";

import { ProjectsHeader } from "../components/ProjectsHeader";
import { ProjectGrid } from "../components/ProjectGrid";
import { ProjectDialog } from "../components/ProjectDialog";

import { useProjects } from "../hooks/useProjects";
import { useCreateProject } from "../hooks/useCreateProject";

export function ProjectListPage() {
  usePageTitle("Project List");

  const [openCreate, setOpenCreate] = useState(false);

  const { data } = useProjects();
  const { mutate, isPending } = useCreateProject();

  return (
    <DashboardLayout>
      <ProjectsHeader onCreate={() => setOpenCreate(true)} />

      <ProjectGrid projects={data || []} />

      <ProjectDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        mode="create"
        isPending={isPending}
        onSubmit={(values) => {
          mutate(values, {
            onSuccess: () => {
              setOpenCreate(false);
            },
          });
        }}
      />
    </DashboardLayout>
  );
}
