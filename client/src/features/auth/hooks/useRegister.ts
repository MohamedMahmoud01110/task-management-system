import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import type { RegisterFormValues } from "../schemas/register.schema";

export function useRegister() {
  const { register } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const { ...payload } = data;
      await register(payload);
    },

    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/projects");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Registration failed");
    },
  });
}
