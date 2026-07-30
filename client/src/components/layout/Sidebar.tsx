import { FolderKanban } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r bg-white lg:block">
      <nav className="flex flex-col gap-2 p-5">
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-slate-100"
            }`
          }
        >
          <FolderKanban size={20} />
          Projects
        </NavLink>
      </nav>
    </aside>
  );
}
