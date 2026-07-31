import {
  FolderKanban,
  Users,
  ListTodo,
  CircleCheckBig,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { StatCard } from "./StatCard";
import type { DashboardStats } from "../../../types/admin.types";

interface Props {
  stats: DashboardStats;
}

export function DashboardStats({ stats }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon={<Users size={24} />}
      />

      <StatCard
        title="Projects"
        value={stats.totalProjects}
        icon={<FolderKanban size={24} />}
      />

      <StatCard
        title="Tasks"
        value={stats.totalTasks}
        icon={<ListTodo size={24} />}
      />

      <StatCard
        title="Completed"
        value={stats.doneTasks}
        icon={<CircleCheckBig size={24} />}
      />

      <StatCard
        title="In Progress"
        value={stats.inProgressTasks}
        icon={<Clock3 size={24} />}
      />

      <StatCard
        title="To Do"
        value={stats.todoTasks}
        icon={<AlertTriangle size={24} />}
      />
    </div>
  );
}