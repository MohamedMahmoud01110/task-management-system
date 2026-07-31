import { Loader2, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

type DeleteType = "project" | "member" | "task";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  isPending?: boolean;
  type: DeleteType;
  name?: string;
}

export function DeleteDialog({
  open,
  onOpenChange,
  onDelete,
  isPending = false,
  type,
  name,
}: DeleteDialogProps) {
  const title =
    type === "project"
      ? "Delete Project"
      : type === "member"
        ? "Remove Member"
        : "Delete Task";

  const description =
    type === "project" ? (
      <>
        This action cannot be undone.
        <br />
        This will permanently delete this project and all associated tasks.
      </>
    ) : type === "member" ? (
      <>
        Are you sure you want to remove <strong>{name}</strong> from this
        project?
        <br />
        This action cannot be undone.
      </>
    ) : (
      <>
        Are you sure you want to delete <strong>{name ?? "this task"}</strong>?
        <br />
        This action cannot be undone.
      </>
    );

  const buttonText =
    type === "project"
      ? "Delete Project"
      : type === "member"
        ? "Remove Member"
        : "Delete Task";

  const loadingText =
    type === "project"
      ? "Deleting..."
      : type === "member"
        ? "Removing..."
        : "Deleting...";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4"
          >
            <X className="h-4 w-4" />
          </Button>

          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {loadingText}
              </>
            ) : (
              buttonText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
