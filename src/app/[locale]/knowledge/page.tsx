import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { KnowledgeMap } from "@/components/KnowledgeMap";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { getDomains, getKnowledgeThemes } from "@/lib/sanity/content";
import { pickLocalized } from "@/lib/localized";
import { buildPageMetadata } from "@/lib/metadata";
import { getBaseUrl } from "@/lib/site";
import { buildBreadcrumbs } from "@/lib/structured-data";
import { slugify } from "@/lib/slugify";

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
  const [domains, knowledgeThemes] = await Promise.all([
    getDomains(),
    getKnowledgeThemes(),
  ]);
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
          <SectionHeading title={t("domainsTitle")} description={t("domainsLead")} />
          {domains.length === 0 ? (
            <p className="mt-6 text-muted">{t("emptyOverview")}</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {domains.map((domain) => {
                const slug = slugify(pickLocalized(domain.title, locale)) || domain.id;
                return (
                  <Card key={domain.id} className="flex flex-col">
                    {domain.image ? (
                      <div className="mb-4 overflow-hidden rounded-lg border border-border">
                        <Image
                          src={domain.image}
                          alt={
                            domain.imageAlt
                              ? pickLocalized(domain.imageAlt, locale)
                              : pickLocalized(domain.title, locale)
                          }
                          width={800}
                          height={500}
                          className="h-auto w-full"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : null}
                    <h3 className="text-lg">{pickLocalized(domain.title, locale)}</h3>
                    {domain.shortDescription ? (
                      <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                        {pickLocalized(domain.shortDescription, locale)}
                      </p>
                    ) : domain.description ? (
                      <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                        {pickLocalized(domain.description, locale)}
                      </p>
                    ) : null}
                    <div className="mt-6">
                      <Link
                        href={`/knowledge/${slug}`}
                        className="text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                      >
                        {t("viewDomain")}
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </Section>

      {knowledgeThemes.length > 0 ? (
        <>
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
      ) : null}
    </>
  );
}
