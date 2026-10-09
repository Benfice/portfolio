import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <Section className="pb-4 pt-16 sm:pt-24">
      <Container>
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-4 max-w-3xl text-4xl tracking-tight sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-xl leading-9 text-muted">{lead}</p>
        ) : null}
      </Container>
    </Section>
  );
}
