import { ClipboardList } from "lucide-react";

export function EmptyTasks() {
  return (
    <div className="rounded-xl border border-dashed py-16 text-center">
      <ClipboardList className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

      <h3 className="text-lg font-semibold">No Tasks Yet</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        Create your first task to start managing your project.
      </p>
    </div>
  );
}
