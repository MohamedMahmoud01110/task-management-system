import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { taskSchema, type TaskFormValues } from "../schemas/task.schema";

import type { User } from "@/types/user.types";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode?: "create" | "edit";

  members: User[];

  defaultValues?: Partial<TaskFormValues>;

  isPending?: boolean;

  onSubmit: (values: TaskFormValues) => void;
}

export function TaskDialog({
  open,
  onOpenChange,
  mode = "create",
  members,
  defaultValues,
  isPending = false,
  onSubmit,
}: TaskDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      assignee: "",
    },
  });
  const selectedMember = members.find((m) => m._id === watch("assignee"));
  useEffect(() => {
    if (open) {
      reset({
        title: defaultValues?.title ?? "",
        description: defaultValues?.description ?? "",
        status: defaultValues?.status ?? "todo",
        priority: defaultValues?.priority ?? "medium",
        dueDate: defaultValues?.dueDate ?? "",
        assignee: defaultValues?.assignee ?? "",
      });
    }
  }, [open, defaultValues, reset]);
  // console.log(selectedTask);
  // console.log(defaultValues?.assignee);
  // console.log(members);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Task" : "Edit Task"}
          </DialogTitle>

          <DialogDescription>
            {mode === "create"
              ? "Create a new task for this project."
              : "Update task information."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}

          <div className="space-y-2">
            <Label>Title</Label>

            <Input placeholder="Fix login bug..." {...register("title")} />

            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              rows={4}
              placeholder="Task description..."
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status */}

            <div className="space-y-2">
              <Label>Status</Label>

              <Select
                value={watch("status")}
                onValueChange={(value) =>
                  setValue("status", value as TaskFormValues["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>

                  <SelectItem value="in_progress">In Progress</SelectItem>

                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}

            <div className="space-y-2">
              <Label>Priority</Label>

              <Select
                value={watch("priority")}
                onValueChange={(value) =>
                  setValue("priority", value as TaskFormValues["priority"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>

                  <SelectItem value="medium">Medium</SelectItem>

                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}

          <div className="space-y-2">
            <Label>Due Date</Label>

            <Input type="date" {...register("dueDate")} />

            {errors.dueDate && (
              <p className="text-sm text-red-500">{errors.dueDate.message}</p>
            )}
          </div>

          {/* Assignee */}

          <div className="space-y-2">
            <Label>Assignee</Label>

            <Select
              value={watch("assignee")}
              onValueChange={(value) => setValue("assignee", value!)}
            >
              <SelectTrigger>
                <SelectValue>
                  {selectedMember?.name ?? "Select member"}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member._id} value={member._id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.assignee && (
              <p className="text-sm text-red-500">{errors.assignee.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "create" ? "Creating..." : "Saving..."}
                </>
              ) : mode === "create" ? (
                "Create Task"
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
