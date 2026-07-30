import type { ReactNode } from "react";

import logo from "../../public/logo.png"; //

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Section */}
        <section className="hidden lg:flex flex-col justify-between bg-linear-to-br from-blue-600 via-indigo-600 to-[#14B8A6] p-12 text-white">
          <div>
            <img src={logo} alt="TaskFlow" className="h-20 w-20" />
          </div>

          <div className="max-w-md">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Manage your team's work effortlessly.
            </h1>

            <p className="text-lg text-blue-100">
              Create projects, assign tasks, collaborate with your team, and
              track progress from one place.
            </p>
          </div>

          <div className="text-sm text-blue-200">© 2026 TaskFlow</div>
        </section>

        {/* Right Section */}
        <section className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">{children}</div>
        </section>
      </div>
    </main>
  );
}
