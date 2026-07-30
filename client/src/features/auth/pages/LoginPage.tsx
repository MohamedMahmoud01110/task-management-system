import usePageTitle from "@/shared/usePageTitle";
import { LoginForm } from "../components/LoginForm";
import { AuthLayout } from "@/layouts/AuthLayout";

export function LoginPage() {
  usePageTitle("login");
  return (

    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
