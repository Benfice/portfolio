import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl tracking-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-muted">{description}</p>
      ) : null}
    </div>
  );
}
