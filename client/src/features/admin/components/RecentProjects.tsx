import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type { DashboardStats } from "../../../types/admin.types";

interface Props {
  projects: DashboardStats["recentProjects"];
}

export function RecentProjects({ projects }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>

      <CardContent>
        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects found.</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <h4 className="font-medium">{project.name}</h4>

                  <p className="text-sm text-muted-foreground">
                    {project.owner.name}
                  </p>
                </div>

                <Badge variant="secondary">Project</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
