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
import usePageTitle from "@/shared/usePageTitle";
import type { Task, TaskFilters } from "@/types/task.types";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { TaskToolbar } from "@/features/tasks/components/TaskToolbar";
import { TaskTable } from "@/features/tasks/components/TaskTable";
import { useCreateTask } from "@/features/tasks/hooks/useCreateTask";
import { useUpdateTask } from "@/features/tasks/hooks/useUpdateTask";
import { useDeleteTask } from "@/features/tasks/hooks/useDeleteTask";
import type { TaskFormValues } from "@/features/tasks/schemas/task.schema";
import { TaskDialog } from "@/features/tasks/components/TaskDialog";

export function ProjectDetailsPage() {
  usePageTitle("Project details");
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data, isPending: getIsPending } = useGetProject(projectId!);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddMember, setOpenAddMember] = useState(false);
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [filters, setFilters] = useState<TaskFilters>({});
  const { mutate: mutateUpdate, isPending: updateProjectIsPending } =
    useUpdateProject();
  const { mutate: mutateDelete, isPending: deleteProjectIsPending } =
    useDeleteProject();
  const { mutate: mutateAddMember, isPending: isAddMemberPending } =
    useAddMember();

  const { data: tasks = [], isPending: tasksIsPending } = useTasks(
    projectId!,
    filters,
  );

  const { mutate: createMutateTask, isPending: createTaskIsPending } =
    useCreateTask();

  const { mutate: updateMutateTask, isPending: updateTaskIsPending } =
    useUpdateTask();

  const { mutate: deleteMutateTask, isPending: deleteTaskIsPending } =
    useDeleteTask();

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
    mutateAddMember(
      {
        projectId: data!._id!,
        email: values.email,
      },
      {
        onSuccess: () => {
          setOpenAddMember(false);
          toast.success("Member added successfully");
        },
      },
    );
  };

  const handleOpenCreateTask = () => {
    setOpenCreateTask(true);
    setSelectedTask(null);
  };
  const handleOpenEditTask = (task: Task) => {
    setOpenEditTask(true);
    setSelectedTask(task);
  };
  const handleOpenDeleteTask = (task: Task) => {
    setSelectedTask(task);
    setOpenDeleteTask(true);
  };
  const handleCreateTask = (values: TaskFormValues) => {
    createMutateTask(
      {
        projectId: projectId!,
        payload: values,
      },
      {
        onSuccess: () => {
          toast.success("Task created successfully");
          setOpenCreateTask(false);
        },
      },
    );
  };

  const handleUpdateTask = (values: TaskFormValues) => {
    if (!selectedTask) return;

    updateMutateTask(
      {
        projectId: projectId!,
        taskId: selectedTask._id,
        payload: values,
      },
      {
        onSuccess: () => {
          toast.success("Task updated successfully");
          setOpenEditTask(false);
          setSelectedTask(null);
        },
      },
    );
  };

  const handleDeleteTask = () => {
    if (!selectedTask) return;

    deleteMutateTask(
      {
        projectId: projectId!,
        taskId: selectedTask._id,
      },
      {
        onSuccess: () => {
          toast.success("Task deleted successfully");
          setOpenDeleteTask(false);
          setSelectedTask(null);
        },
      },
    );
  };
  return (
    <DashboardLayout>
      {getIsPending || updateProjectIsPending || !data ? (
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

          {/* ================= TASKS ================= */}
          <TaskToolbar
            filters={filters}
            members={data.members}
            onFiltersChange={setFilters}
            onCreate={handleOpenCreateTask}
          />
          {tasksIsPending ? (
            <Loader />
          ) : (
            <>
              <TaskTable
                tasks={tasks}
                onEdit={handleOpenEditTask}
                onDelete={handleOpenDeleteTask}
              />
            </>
          )}
          {/* ================= DIALOGS ================= */}

          <ProjectDialog
            open={openEdit}
            onOpenChange={setOpenEdit}
            mode="edit"
            defaultValues={{
              name: data.name,
              description: data.description ?? "",
            }}
            isPending={updateProjectIsPending}
            onSubmit={handleUpdateProject}
          />

          <DeleteDialog
            open={openDelete}
            type="project"
            onOpenChange={setOpenDelete}
            onDelete={handleDeleteProject}
            isPending={deleteProjectIsPending}
          />

          <AddMemberDialog
            open={openAddMember}
            onOpenChange={setOpenAddMember}
            isPending={isAddMemberPending}
            onSubmit={handleAddMember}
          />

          <TaskDialog
            open={openCreateTask}
            onOpenChange={setOpenCreateTask}
            mode="create"
            members={data.members}
            isPending={createTaskIsPending}
            onSubmit={handleCreateTask}
          />

          <TaskDialog
            open={openEditTask}
            onOpenChange={setOpenEditTask}
            mode="edit"
            members={data.members}
            defaultValues={
              selectedTask
                ? {
                    title: selectedTask.title,
                    description: selectedTask.description,
                    status: selectedTask.status,
                    priority: selectedTask.priority,
                    dueDate: selectedTask.dueDate?.slice(0, 10),
                    assignee:
                      typeof selectedTask.assignee === "string"
                        ? selectedTask.assignee
                        : selectedTask.assignee?._id,
                  }
                : undefined
            }
            isPending={updateTaskIsPending}
            onSubmit={handleUpdateTask}
          />

          <DeleteDialog
            open={openDeleteTask}
            onOpenChange={setOpenDeleteTask}
            type="task"
            isPending={deleteTaskIsPending}
            onDelete={handleDeleteTask}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
