import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary: "border border-border hover:bg-foreground/5",
  ghost: "hover:bg-foreground/5",
};

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: { variant?: Variant } & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props} />
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: { variant?: Variant } & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}

export function ButtonAnchor({
  variant = "primary",
  className,
  ...props
}: { variant?: Variant } & ComponentProps<"a">) {
  return <a className={cn(base, variants[variant], className)} {...props} />;
}
