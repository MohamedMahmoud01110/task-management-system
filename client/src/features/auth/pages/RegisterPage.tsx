import usePageTitle from "@/shared/usePageTitle";
import { RegisterForm } from "../components/RegisterForm";
import { AuthLayout } from "@/layouts/AuthLayout";

export function RegisterPage() {
  usePageTitle("register");
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
