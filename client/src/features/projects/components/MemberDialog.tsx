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

import {
  addMemberSchema,
  type AddMemberFormValues,
} from "../schemas/addMember.schema";

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPending?: boolean;
  onSubmit: (values: AddMemberFormValues) => void;
}

export function AddMemberDialog({
  open,
  onOpenChange,
  isPending = false,
  onSubmit,
}: AddMemberDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleClose = (value: boolean) => {
    if (!value) {
      reset();
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>

          <DialogDescription>
            Add a new member to this project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Member Email</Label>

            <Input
              id="email"
              placeholder="example@gmail.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Member"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
