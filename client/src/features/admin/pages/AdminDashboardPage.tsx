import usePageTitle from "@/shared/usePageTitle";
import { DashboardLayout } from "@/layouts/DashboardLayout";

import Loader from "@/components/common/Loader";

import { DashboardStats } from "../components/DashboardStats";
import { RecentProjects } from "../components/RecentProjects";
import { RecentUsers } from "../components/RecentUsers";

import { useDashboard } from "../hooks/useDashboard";

export function AdminDashboardPage() {
  usePageTitle("Admin Dashboard");

  const { data, isPending } = useDashboard();

  if (isPending || !data) {
    return <Loader />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <p className="text-muted-foreground">
            Monitor users, projects and tasks.
          </p>
        </div>

        <DashboardStats stats={data} />

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentProjects projects={data.recentProjects} />

          <RecentUsers users={data.recentUsers} />
        </div>
      </div>
    </DashboardLayout>
  );
}
