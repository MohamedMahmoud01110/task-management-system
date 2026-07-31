import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { User } from "@/types/user.types";
import type { TaskFilters } from "@/types/task.types";

interface TaskToolbarProps {
  filters: TaskFilters;
  members: User[];

  onFiltersChange: (filters: TaskFilters) => void;

  onCreate: () => void;
}

export function TaskToolbar({
  filters,
  members,
  onFiltersChange,
  onCreate,
}: TaskToolbarProps) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status */}
          <Select
            value={filters.status ?? "all"}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value === "all" ? undefined : (value as any),
              })
            }
          >
            <SelectTrigger className="w-42.5">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority */}
          <Select
            value={filters.priority ?? "all"}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                priority: value === "all" ? undefined : (value as any),
              })
            }
          >
            <SelectTrigger className="w-42.5">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          {/* Assignee */}
          <Select
            value={filters.assignee ?? "all"}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                assignee: value === "all" ? undefined : (value as string),
              })
            }
          >
            <SelectTrigger className="w-55">
              <SelectValue>
                {filters.assignee
                  ? members.find((m) => m._id === filters.assignee)?.name
                  : "All Members"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>

              {members.map((member) => (
                <SelectItem key={member._id} value={member._id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="hidden h-8 md:block" />

        <Button onClick={onCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>
    </div>
  );
}
