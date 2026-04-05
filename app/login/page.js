import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { getSessionUser } from "@/lib/data";

export const metadata = {
  title: "Login | Noir Table"
};

export default async function LoginPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/menu");
  }

  return (
    <AuthShell
      description="Sign in to access the protected menu, see your favorites, and continue your dining journey."
      mode="login"
      title="Login to your table"
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}

