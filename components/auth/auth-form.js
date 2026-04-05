"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthForm({ mode = "login" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();
  const redirectTo = searchParams.get("next") || "/menu";
  const [isPending, setIsPending] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsPending(true);

    const isLogin = mode === "login";

    const { data, error } = isLogin
      ? await supabase.auth.signInWithPassword({
          email,
          password
        })
      : await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName
            }
          }
        });

    if (error) {
      toast.error(error.message);
      setIsPending(false);
      return;
    }

    if (!isLogin && !data.session) {
      toast.success("Account created. Confirm your email to finish signing in.");
      router.push("/login");
      router.refresh();
      setIsPending(false);
      return;
    }

    toast.success(isLogin ? "Welcome back to Noir Table." : "Your account is ready.");
    router.push(redirectTo);
    router.refresh();
    setIsPending(false);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {mode === "signup" ? (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/75" htmlFor="fullName">
            Full name
          </label>
          <Input
            autoComplete="name"
            id="fullName"
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Ava Thompson"
            required
            value={fullName}
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/75" htmlFor="email">
          Email
        </label>
        <Input
          autoComplete="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ava@noirtable.com"
          required
          type="email"
          value={email}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm font-medium text-white/75" htmlFor="password">
            Password
          </label>
          {mode === "login" ? (
            <span className="text-xs text-white/45">Use the password from signup.</span>
          ) : null}
        </div>
        <Input
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          id="password"
          minLength={6}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimum 6 characters"
          required
          type="password"
          value={password}
        />
      </div>

      <Button className="w-full" disabled={isPending} size="lg" type="submit">
        {isPending ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {mode === "login" ? "Signing in..." : "Creating account..."}
          </>
        ) : mode === "login" ? (
          "Login"
        ) : (
          "Sign up"
        )}
      </Button>

      <p className="text-center text-xs leading-6 text-white/45">
        By continuing, you agree to a personalized dining experience powered by Supabase Auth.
      </p>

      <div className="rounded-[1.5rem] border border-white/8 bg-black/30 px-4 py-4 text-sm leading-6 text-white/55">
        <span className="font-semibold text-white/75">Tip:</span> after deploying to Vercel, add
        your production URL in Supabase Auth settings for email confirmations and session redirects.
        {mode === "login" ? (
          <>
            {" "}
            <Link className="font-semibold text-accent-gold hover:text-white" href="/signup">
              Create an account
            </Link>{" "}
            if you are new here.
          </>
        ) : null}
      </div>
    </form>
  );
}

