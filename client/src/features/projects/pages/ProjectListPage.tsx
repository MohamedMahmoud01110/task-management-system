import { useState } from "react";

import usePageTitle from "@/shared/usePageTitle";
import { DashboardLayout } from "@/layouts/DashboardLayout";

import { ProjectsHeader } from "../components/ProjectsHeader";
import { ProjectGrid } from "../components/ProjectGrid";
import { ProjectDialog } from "../components/ProjectDialog";

import { useProjects } from "../hooks/useProjects";
import { useCreateProject } from "../hooks/useCreateProject";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@base-ui/react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { EmptyProjects } from "../components/EmptyProjects";

export function ProjectListPage() {
  usePageTitle("Project List");

  const [openCreate, setOpenCreate] = useState(false);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const { data } = useProjects({
    page,
    limit: 6,
    search,
    sort,
  });
  const { mutate, isPending } = useCreateProject();
  console.log(data?.data);

  return (
    <DashboardLayout>
      <ProjectsHeader onCreate={() => setOpenCreate(true)} />
      <div className="flex items-center justify-between gap-4 py-6 relative">
        <Search className="absolute left-2 top-8 text-gray-400" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-sm h-10 w56 bg-white56 bg-white pl-9 rounded-3xl px-4"
        />

        <Select
          value={sort}
          onValueChange={(value) => setSort(value as "newest" | "oldest")}
        >
          <SelectTrigger className="w-48 bg-white">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {data?.data?.length! > 0 ? (
        <ProjectGrid projects={data?.data ?? []} />
      ) : (
        <EmptyProjects />
      )}

      <div className="flex justify-center gap-3 py-10">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <span className="flex items-center px-4">{page}</span>

        <Button
          variant="outline"
          disabled={
            page === data?.pagination.totalPages || data?.data.length === 0
          }
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
      <ProjectDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        mode="create"
        isPending={isPending}
        onSubmit={(values) => {
          mutate(values, {
            onSuccess: () => {
              setOpenCreate(false);
            },
          });
        }}
      />
    </DashboardLayout>
  );
}
