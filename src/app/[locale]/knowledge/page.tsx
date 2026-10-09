import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { knowledgeThemes } from "@/content/knowledge";
import { pickLocalized } from "@/lib/localized";
import { localeAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Knowledge" });

  return {
    title: t("title"),
    description: t("lead"),
    alternates: localeAlternates("/knowledge"),
  };
}

export default async function KnowledgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Knowledge");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      {knowledgeThemes.map((theme) => (
        <Section key={theme.id} className="pt-0">
          <Container>
            <SectionHeading
              title={pickLocalized(theme.title, locale)}
              description={pickLocalized(theme.description, locale)}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {theme.concepts.map((concept) => (
                <Card key={concept.id} className="flex flex-col">
                  <h3 className="text-lg">
                    {pickLocalized(concept.title, locale)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                    {pickLocalized(concept.summary, locale)}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {concept.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <Section className="pt-0">
        <Container>
          <p className="rounded-2xl border border-dashed border-border px-6 py-8 text-center text-sm text-muted">
            {t("mapNote")}
          </p>
        </Container>
      </Section>
    </>
  );
}
