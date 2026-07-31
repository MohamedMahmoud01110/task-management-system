import { Badge } from "@/components/ui/badge";
import type { TaskPriority } from "@/types/task.types";

interface Props {
  priority: TaskPriority;
}

const priorityConfig = {
  low: {
    label: "Low",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  medium: {
    label: "Medium",
    className: "bg-orange-100 text-orange-700 border-orange-200",
  },
  high: {
    label: "High",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

export function TaskPriorityBadge({ priority }: Props) {
  const config = priorityConfig[priority];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
