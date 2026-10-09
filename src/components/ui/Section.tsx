import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}
