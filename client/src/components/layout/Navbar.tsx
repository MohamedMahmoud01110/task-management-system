import { Bell } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex justify-center items-center gap-2">
        <img
          src="/logo.png"
          className="w-10 h-10"
          alt="logo image"
        />
        <h1 className="text-xl font-bold text-slate-800">TaskFlow</h1>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="h-5 w-5 text-slate-600" />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage />

              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>{user?.name}</DropdownMenuItem>

            <DropdownMenuItem onClick={logout} className=" cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
