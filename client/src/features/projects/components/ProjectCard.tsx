import { FolderKanban, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Project } from "@/types/project.types";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
      onClick={(e) => {
        (e.stopPropagation(), navigate(`/projects/${project._id}`));
      }}
    >
      <FolderKanban className="mb-4 text-blue-600" />

      <h3 className="text-xl font-semibold">{project.name}</h3>

      <p className="mt-2 line-clamp-2 text-slate-500">{project.description}</p>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Users size={16} />
          {project.members.length} Members
        </div>
      </div>
    </div>
  );
}
