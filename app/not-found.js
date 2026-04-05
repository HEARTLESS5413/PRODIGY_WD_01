import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Not Found"
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel max-w-xl rounded-[2rem] px-8 py-12 text-center">
        <p className="text-xs uppercase tracking-[0.34em] text-accent-gold">404</p>
        <h1 className="mt-4 text-5xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-white/65">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link className={buttonVariants()} href="/">
            Back to home
          </Link>
          <Link className={buttonVariants({ variant: "secondary" })} href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
