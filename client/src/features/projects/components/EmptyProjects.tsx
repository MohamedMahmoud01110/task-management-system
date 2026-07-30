import { FolderOpen } from "lucide-react";

export function EmptyProjects() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-20">
      <FolderOpen className="mb-4 text-slate-400" size={64} />

      <h2 className="text-2xl font-semibold">No Projects Yet</h2>

      <p className="mt-2 text-slate-500">
        Create your first project to start managing tasks.
      </p>
    </div>
  );
}
