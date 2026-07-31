import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type { DashboardStats } from "../../../types/admin.types";

interface Props {
  users: DashboardStats["recentUsers"];
}

export function RecentUsers({ users }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>

      <CardContent>
        {users.length === 0 ? (
          <p className="text-sm text-muted-foreground">No users found.</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <h4 className="font-medium">{user.name}</h4>

                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <Badge>{user.role}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
