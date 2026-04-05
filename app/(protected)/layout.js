import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { isAdminUser } from "@/lib/admin";
import { getProfile, getSessionUser } from "@/lib/data";

export default async function ProtectedLayout({ children }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile(user.id);
  const isAdmin = isAdminUser(user);

  return (
    <DashboardShell isAdmin={isAdmin} profile={profile} user={user}>
      {children}
    </DashboardShell>
  );
}
