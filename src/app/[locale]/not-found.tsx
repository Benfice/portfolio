import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <Section className="pt-24">
      <Container>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          404
        </p>
        <h1 className="mt-4 text-4xl tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          {t("body")}
        </p>
        <div className="mt-8">
          <ButtonLink href="/">{t("back")}</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
