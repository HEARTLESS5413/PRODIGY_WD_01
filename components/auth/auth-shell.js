import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function AuthShell({ title, description, children, mode }) {
  const alternateHref = mode === "login" ? "/signup" : "/login";
  const alternateLabel = mode === "login" ? "Need an account?" : "Already a member?";
  const alternateAction = mode === "login" ? "Create one" : "Log in";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="ambient-orb left-[-6rem] top-12 h-72 w-72 animate-pulseSoft" />
      <div
        className="absolute bottom-[-8rem] right-[-6rem] h-96 w-96 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(245, 185, 113, 0.18), transparent 74%)"
        }}
      />

      <div className="shell relative z-10 py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
            href="/"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to landing
          </Link>
        </div>

        <div className="mt-10 grid min-h-[calc(100vh-8rem)] items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="glass-panel hidden rounded-[2.3rem] p-8 lg:block">
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-accent-gold">
                  Private members club
                </p>
                <h2 className="mt-4 text-5xl font-semibold text-white">
                  Dinner worth coming back to.
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  "Secure Supabase email authentication",
                  "Protected routes with session-aware navigation",
                  "Live favorites synced directly from the database"
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-white/8 bg-black/25 px-5 py-4 text-sm leading-6 text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl">
            <div className="glass-panel rounded-[2.2rem] p-6 sm:p-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.32em] text-accent-gold">
                  {mode === "login" ? "Welcome back" : "Become a member"}
                </p>
                <h1 className="text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
                <p className="text-sm leading-7 text-white/65 sm:text-base">{description}</p>
              </div>

              <div className="mt-8">{children}</div>

              <p className="mt-6 text-sm text-white/55">
                {alternateLabel}{" "}
                <Link className="font-semibold text-accent-gold hover:text-white" href={alternateHref}>
                  {alternateAction}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

