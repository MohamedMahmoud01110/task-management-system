import { Badge } from "@/components/ui/badge";
import type { TaskStatus } from "@/types/task.types";

interface Props {
  status: TaskStatus;
}

const statusConfig = {
  todo: {
    label: "To Do",
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  done: {
    label: "Done",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
};

export function TaskStatusBadge({ status }: Props) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
