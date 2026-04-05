"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, Heart, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useScrollState } from "@/hooks/use-scroll-state";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Button, buttonVariants } from "@/components/ui/button";

const navigationItems = [
  {
    href: "/menu",
    label: "Menu",
    icon: UtensilsCrossed
  },
  {
    href: "/favorites",
    label: "Favorites",
    icon: Heart
  }
];

export function DashboardNavbar({ user, profile, isAdmin }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const hasScrolled = useScrollState(18);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName = profile?.full_name || user?.user_metadata?.full_name || "Guest";

  async function handleLogout() {
    setIsLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      setIsLoggingOut(false);
      return;
    }

    toast.success("You have been logged out.");
    router.push("/login");
    router.refresh();
    setIsLoggingOut(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="shell pt-4">
        <div
          className={cn(
            "rounded-[1.75rem] border transition duration-300",
            hasScrolled
              ? "border-white/12 bg-black/70 shadow-card backdrop-blur-2xl"
              : "border-white/8 bg-black/35 backdrop-blur-xl"
          )}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Logo compact href="/menu" />

            <nav className="hidden items-center gap-2 md:flex">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition duration-300",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/65 hover:bg-white/6 hover:text-white"
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-right">
                <p className="text-sm font-semibold text-white">{displayName}</p>
                <p className="text-xs text-white/50">
                  {isAdmin ? "Admin" : "Member"} • {user.email}
                </p>
              </div>
              <Button disabled={isLoggingOut} onClick={handleLogout} size="sm" variant="secondary">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>

            <button
              aria-label="Toggle navigation"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              type="button"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMobileMenuOpen ? (
            <div className="border-t border-white/8 px-4 pb-4 pt-3 md:hidden">
              <div className="mb-4 rounded-[1.5rem] border border-white/8 bg-white/5 px-4 py-4">
                <p className="text-sm font-semibold text-white">{displayName}</p>
                <p className="text-xs text-white/50">
                  {isAdmin ? "Admin" : "Member"} • {user.email}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    className={buttonVariants({
                      variant: pathname === item.href ? "secondary" : "ghost",
                      className: "justify-start rounded-2xl px-4"
                    })}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
                <Button
                  className="justify-start rounded-2xl px-4"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  variant="secondary"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
