import { Loader2 } from "lucide-react";
import { useEffect } from "react";
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

import { createProjectSchema, type CreateProjectFormValues } from "../schemas/createProject.schema";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode?: "create" | "edit";

  defaultValues?: Partial<CreateProjectFormValues>;

  isPending?: boolean;

  onSubmit: (values: CreateProjectFormValues) => void;
}

export function ProjectDialog({
  open,
  onOpenChange,
  mode = "create",
  defaultValues,
  isPending = false,
  onSubmit,
}: ProjectDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: defaultValues?.name ?? "",
        description: defaultValues?.description ?? "",
      });
    }
  }, [open, defaultValues, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Project" : "Edit Project"}
          </DialogTitle>

          <DialogDescription>
            {mode === "create"
              ? "Create a project for your team."
              : "Update your project information."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>

            <Input
              id="name"
              placeholder="Task Management System"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              rows={5}
              placeholder="Write a short description..."
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending} className="cursor-pointer">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "create" ? "Creating..." : "Saving..."}
                </>
              ) : mode === "create" ? (
                "Create Project"
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
