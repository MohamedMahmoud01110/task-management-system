import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { User as Member } from "@/types/user.types";
import { Button } from "@base-ui/react";
import { Trash2 } from "lucide-react";
import { useDeleteMember } from "../hooks/useDeleteMember";
import { toast } from "sonner";
import { useState } from "react";
import { DeleteDialog } from "./DeleteDialog";

interface Props {
  members: Member[];
  projectId: string;
  ownerId: string;
}

export function MembersSection({ members, ownerId, projectId }: Props) {
  const { mutate: mutateDelete } = useDeleteMember();
  const [openDialog, setOpenDialog] = useState(false);
  const [memberId, setMemberId] = useState<string | undefined>(undefined);
  const [memberName, setMemberName] = useState<string | undefined>(undefined);

  function toggleDialog(memberId: string, memberName: string) {
    setOpenDialog(!openDialog);
    setMemberId(memberId);
    setMemberName(memberName);
  }
  function handleDeleteMember(memberId: string) {
    mutateDelete(
      {
        projectId,
        memberId,
      },
      {
        onSuccess: () => {
          toast.success("Member deleted successfully");
          setOpenDialog(false);
        },
      },
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-5 text-xl font-semibold">Members</h2>

      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member._id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{member.name}</p>

                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>

            {member._id === ownerId ? (
              <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                Owner
              </span>
            ) : (
              <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-yellow-500">
                Member
              </span>
            )}
            <Button
              className="cursor-pointer text-red-600 hover:text-red-700"
              onClick={() => toggleDialog(member._id, member.name)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <DeleteDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onDelete={() => handleDeleteMember(memberId!)}
        type="member"
        name={memberName}
      />
    </div>
  );
}
