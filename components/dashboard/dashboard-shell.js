import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";

export function DashboardShell({ user, profile, isAdmin, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="ambient-orb left-[-7rem] top-[20rem] h-72 w-72" />
      <div
        className="absolute right-[-8rem] top-[6rem] h-80 w-80 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(116, 225, 192, 0.15), transparent 74%)"
        }}
      />
      <DashboardNavbar isAdmin={isAdmin} profile={profile} user={user} />
      <main className="shell relative z-10 pb-16 pt-28 sm:pt-32">{children}</main>
    </div>
  );
}
