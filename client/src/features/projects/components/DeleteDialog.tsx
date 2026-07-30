import { Loader2 } from "lucide-react";

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

type DeleteType = "project" | "member";

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
  const isProject = type === "project";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isProject ? "Delete Project" : "Remove Member"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {isProject ? (
              <>
                This action cannot be undone.
                <br />
                This will permanently delete this project and all associated
                tasks.
              </>
            ) : (
              <>
                Are you sure you want to remove <strong>{name}</strong> from
                this project?
                <br />
                This action cannot be undone.
              </>
            )}
          </AlertDialogDescription>
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
                {isProject ? "Deleting..." : "Removing..."}
              </>
            ) : isProject ? (
              "Delete Project"
            ) : (
              "Remove Member"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
