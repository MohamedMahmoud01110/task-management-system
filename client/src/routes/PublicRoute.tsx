import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/common/Loader";

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/projects" replace />;
  }

  return <Outlet />;
}
