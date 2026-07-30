import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import type { LoginFormValues } from "../schemas/login.schema";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      await login(data);
    },

    onSuccess: () => {
      toast.success("Login successfully");
      navigate("/projects");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Invalid email or password",
      );
    },
  });
}
