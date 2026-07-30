import type { Project } from "@/types/project.types";
import { ProjectCard } from "./ProjectCard";

interface Props {
  projects: Project[];
}

export function ProjectGrid({ projects }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
