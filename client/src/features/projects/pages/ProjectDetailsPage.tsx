import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useGetProject } from "../hooks/useGetProject";
import { ProjectHeader } from "../components/ProjectHeader";
import { MembersSection } from "../components/MembersSection";
import Loader from "@/components/common/Loader";
import { useState } from "react";
import { useUpdateProject } from "../hooks/useUpdateProject";
import type { UpdateProjectPayload } from "@/types/project.types";
import { ProjectDialog } from "../components/ProjectDialog";
import { toast } from "sonner";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "../components/DeleteDialog";
import { useAddMember } from "../hooks/useAddMember";
import { AddMemberDialog } from "../components/MemberDialog";
import type { AddMemberFormValues } from "../schemas/addMember.schema";

export function ProjectDetailsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data, isPending: getIsPending } = useGetProject(projectId!);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddMember, setOpenAddMember] = useState(false);

  const { mutate: mutateUpdate, isPending: updateIsPending } =
    useUpdateProject();
  const { mutate: mutateDelete, isPending: deleteIsPending } =
    useDeleteProject();
  const { mutate: mutateAddMember, isPending: isAddMemberPending } =
    useAddMember();
  const handleOpenAdd = () => {
    setOpenAddMember(true);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleUpdateProject = (values: UpdateProjectPayload) => {
    mutateUpdate(
      {
        id: data!._id,
        payload: values,
      },
      {
        onSuccess: () => {
          setOpenEdit(false);
          toast.success("Project updated successfully");
        },
      },
    );
  };

  const handleDeleteProject = () => {
    mutateDelete(data!._id, {
      onSuccess: () => {
        toast.success("Project deleted successfully");
        setOpenDelete(false);
        navigate("/projects");
      },
    });
  };

  const handleAddMember = (values: AddMemberFormValues) => {
    mutateAddMember({
      projectId: data!._id!,
      userId: values.email,
    });
  };
  return (
    <DashboardLayout>
      {getIsPending || updateIsPending || !data ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          <ProjectHeader
            project={data}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            onAddMember={handleOpenAdd}
          />

          <MembersSection
            members={data.members}
            projectId={data._id}
            ownerId={
              typeof data.owner === "string" ? data.owner : data.owner._id
            }
          />
          <ProjectDialog
            open={openEdit}
            onOpenChange={setOpenEdit}
            mode="edit"
            defaultValues={{
              name: data.name,
              description: data.description ?? "",
            }}
            isPending={updateIsPending}
            onSubmit={handleUpdateProject}
          />
          <DeleteDialog
            open={openDelete}
            type="project"
            onOpenChange={setOpenDelete}
            onDelete={handleDeleteProject}
            isPending={deleteIsPending}
          />
          <AddMemberDialog
            open={openAddMember}
            onOpenChange={setOpenAddMember}
            isPending={isAddMemberPending}
            onSubmit={handleAddMember}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
