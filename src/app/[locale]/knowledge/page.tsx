import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { KnowledgeMap } from "@/components/KnowledgeMap";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getKnowledgeThemes } from "@/lib/sanity/content";
import { pickLocalized } from "@/lib/localized";
import { buildPageMetadata } from "@/lib/metadata";
import { getBaseUrl } from "@/lib/site";
import { buildBreadcrumbs } from "@/lib/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Knowledge" });

  return buildPageMetadata({
    locale,
    path: "/knowledge",
    absoluteTitle: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function KnowledgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Knowledge");
  const nav = await getTranslations("Nav");
  const knowledgeThemes = await getKnowledgeThemes();
  const breadcrumbs = buildBreadcrumbs({
    base: getBaseUrl(),
    locale,
    items: [
      { name: nav("home"), path: "/" },
      { name: nav("knowledge"), path: "/knowledge" },
    ],
  });

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      <Section className="pt-0">
        <Container>
          <SectionHeading title={t("mapTitle")} />
          <KnowledgeMap
            themes={knowledgeThemes.map((theme) => ({
              id: theme.id,
              title: pickLocalized(theme.title, locale),
              concepts: theme.concepts.map((concept) => ({
                id: concept.id,
                title: pickLocalized(concept.title, locale),
                summary: pickLocalized(concept.summary, locale),
                tags: concept.tags,
              })),
            }))}
          />
        </Container>
      </Section>

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
    </>
  );
}
