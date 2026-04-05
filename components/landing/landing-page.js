"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import { dashboardHighlights } from "@/lib/constants";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const metrics = [
  { value: "4.9", label: "average guest rating" },
  { value: "12", label: "curated dishes seeded" },
  { value: "24/7", label: "favorites synced live" }
];

export function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="ambient-orb left-[-8rem] top-16 h-72 w-72 animate-pulseSoft" />
      <div
        className="absolute right-[-6rem] top-40 h-80 w-80 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(116, 225, 192, 0.22), transparent 72%)"
        }}
      />

      <header className="shell relative z-10 flex items-center justify-between py-6">
        <Logo />
        <div className="hidden items-center gap-3 sm:flex">
          <Link className={buttonVariants({ variant: "ghost" })} href="/login">
            Login
          </Link>
          <Link className={buttonVariants()} href="/signup">
            Join Now
          </Link>
        </div>
      </header>

      <main className="shell relative z-10 pb-20 pt-8 sm:pb-24 sm:pt-14 lg:pb-28">
        <section className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-accent-gold"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55 }}
            >
              <Sparkles className="h-4 w-4" />
              Chef-curated premium dining
            </motion.div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.65, delay: 0.05 }}
            >
              <h1 className="max-w-4xl text-6xl font-semibold leading-[0.92] text-white sm:text-7xl lg:text-8xl">
                Elevated dining,{" "}
                <span className="text-gradient">personalized for every guest.</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                Noir Table pairs a cinematic dark aesthetic with secure Supabase-powered
                authentication, real-time favorites, and a dynamic menu built for modern
                restaurants.
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              <Link className={buttonVariants({ size: "lg" })} href="/signup">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className={buttonVariants({ variant: "secondary", size: "lg" })} href="/login">
                Explore the Menu
              </Link>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="glass-panel rounded-[1.75rem] px-5 py-6 text-left"
                >
                  <p className="text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">{metric.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7 }}
          >
            <div className="gradient-border rounded-[2rem] p-6 shadow-card">
              <div className="glass-panel rounded-[1.6rem] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.34em] text-white/45">
                      Tonight&apos;s experience
                    </p>
                    <h2 className="mt-3 text-4xl font-semibold text-white">Chef&apos;s Journey</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm text-white/70">
                    Members only
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {dashboardHighlights.map((item, index) => (
                    <motion.div
                      key={item.title}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-4 rounded-[1.5rem] border border-white/8 bg-black/30 px-4 py-4"
                      initial={{ opacity: 0, x: 18 }}
                      transition={{ delay: 0.16 + index * 0.08 }}
                    >
                      <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/7">
                        {index === 0 ? (
                          <UtensilsCrossed className="h-5 w-5 text-accent-gold" />
                        ) : index === 1 ? (
                          <Heart className="h-5 w-5 text-accent-coral" />
                        ) : (
                          <ShieldCheck className="h-5 w-5 text-accent-mint" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-white/60">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.32em] text-white/45">Guest perk</p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-3xl font-semibold text-white">Priority favorites</p>
                      <p className="mt-2 text-sm leading-6 text-white/60">
                        Save, revisit, and reorder the dishes you love most.
                      </p>
                    </div>
                    <span className={buttonVariants({ size: "sm" })}>Book a table</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-24 space-y-10">
          <SectionHeading
            align="center"
            eyebrow="Why guests stay"
            title="Built for an immersive dining-first experience"
            description="From the first sign-in to a saved dessert lineup, every touchpoint is designed to feel premium, fast, and deeply personal."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Secure access",
                body: "Supabase Auth protects every dashboard route and keeps guest sessions reliable."
              },
              {
                title: "Dynamic menu management",
                body: "Chef-ready forms and database-backed categories make the menu easy to evolve."
              },
              {
                title: "Real-time favorites",
                body: "Guests can add and remove favorites instantly with synced updates across views."
              }
            ].map((feature) => (
              <div key={feature.title} className="glass-panel rounded-[1.8rem] p-6">
                <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

