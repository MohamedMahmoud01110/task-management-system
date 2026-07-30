import { ArrowLeft, Pencil, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import type { Project } from "@/types/project.types";

export function ProjectHeader({
  project,
  onEdit,
  onDelete,
  onAddMember,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  onAddMember: () => void;
}) {
  return (
    <div className="space-y-6 rounded-xl border bg-white p-6">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{project.name}</h1>

          <p className="text-muted-foreground">{project.description}</p>

          <div className="flex flex-wrap gap-6 pt-2 text-sm text-muted-foreground">
            <span>
              <strong>Owner:</strong> {project.owner.name}
            </span>

            <span className="flex items-center gap-2">
              <Users size={16} />
              {project.members.length} Member
              {project.members.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="cursor-pointer" onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onAddMember}
          >
            <Users className="mr-2 h-4 w-4" />
            Add Member
          </Button>

          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
