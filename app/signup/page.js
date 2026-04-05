import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { getSessionUser } from "@/lib/data";

export const metadata = {
  title: "Sign Up"
};

export default async function SignupPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/menu");
  }

  return (
    <AuthShell
      description="Create an account to unlock the full menu, track your favorite dishes, and enjoy a premium restaurant experience."
      mode="signup"
      title="Join Noir Table"
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
