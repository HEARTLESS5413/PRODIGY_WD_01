import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getProfile, getSessionUser } from "@/lib/data";

export default async function ProtectedLayout({ children }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile(user.id);

  return (
    <DashboardShell profile={profile} user={user}>
      {children}
    </DashboardShell>
  );
}

