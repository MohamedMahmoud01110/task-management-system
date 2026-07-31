import { FolderKanban, LayoutDashboard, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <aside className="hidden h-250 w-64 border-r bg-white lg:flex lg:flex-col">
      <nav className="flex flex-1 flex-col p-5">
        <div className="space-y-2">
          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100"
                }`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
          )}

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`
            }
          >
            <FolderKanban size={20} />
            Projects
          </NavLink>
        </div>

        <div className="mt-auto pt-6">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>
    </aside>
  );
}