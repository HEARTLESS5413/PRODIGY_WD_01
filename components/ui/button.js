import { cn } from "@/lib/utils";

const buttonStyles = {
  primary:
    "bg-gradient-to-r from-accent-coral via-accent-gold to-accent-mint text-base-950 shadow-card hover:brightness-110",
  secondary:
    "border border-white/12 bg-white/5 text-white hover:border-white/25 hover:bg-white/10",
  ghost: "text-white/80 hover:bg-white/6 hover:text-white",
  danger: "border border-red-400/20 bg-red-500/10 text-red-100 hover:bg-red-500/20"
};

const sizeStyles = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
  lg: "h-12 px-6 text-base"
};

export function buttonVariants({ variant = "primary", size = "md", className } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60",
    buttonStyles[variant],
    sizeStyles[size],
    className
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}) {
  return (
    <button className={buttonVariants({ variant, size, className })} type={type} {...props} />
  );
}

