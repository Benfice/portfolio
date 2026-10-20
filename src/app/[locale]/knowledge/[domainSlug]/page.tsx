import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { getDomains, getKnowledgeItemsByDomain } from "@/lib/sanity/content";
import { pickLocalized } from "@/lib/localized";
import { buildPageMetadata } from "@/lib/metadata";
import { getBaseUrl } from "@/lib/site";
import { buildBreadcrumbs } from "@/lib/structured-data";
import { slugify } from "@/lib/slugify";

export async function generateStaticParams() {
  const domains = await getDomains();
  return domains.map((domain) => ({
    domainSlug: slugify(pickLocalized(domain.title, "fr")) || domain.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; domainSlug: string }>;
}): Promise<Metadata> {
  const { locale, domainSlug } = await params;
  const domains = await getDomains();
  const domain = domains.find(
    (d) => slugify(pickLocalized(d.title, locale)) === domainSlug || slugify(pickLocalized(d.title, "fr")) === domainSlug || d.id === domainSlug,
  );
  if (!domain) return {};
  return buildPageMetadata({
    locale,
    path: `/knowledge/${domainSlug}`,
    absoluteTitle: pickLocalized(domain.title, locale),
    description: domain.shortDescription ? pickLocalized(domain.shortDescription, locale) : domain.description ? pickLocalized(domain.description, locale) : undefined,
  });
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ locale: string; domainSlug: string }>;
}) {
  const { locale, domainSlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Knowledge");
  const nav = await getTranslations("Nav");
  const domains = await getDomains();
  const domain = domains.find(
    (d) => slugify(pickLocalized(d.title, locale)) === domainSlug || slugify(pickLocalized(d.title, "fr")) === domainSlug || d.id === domainSlug,
  );
  if (!domain) notFound();

  const items = await getKnowledgeItemsByDomain(domain.id);
  const breadcrumbs = buildBreadcrumbs({
    base: getBaseUrl(),
    locale,
    items: [
      { name: nav("home"), path: "/" },
      { name: nav("knowledge"), path: "/knowledge" },
      { name: pickLocalized(domain.title, locale), path: `/knowledge/${domainSlug}` },
    ],
  });

  const groups = items.reduce<Record<string, typeof items>>((acc, item) => {
    const key = item.category ? pickLocalized(item.category, locale) || "other" : "other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
  const groupKeys = Object.keys(groups).sort((a, b) => {
    if (a === "other") return 1;
    if (b === "other") return -1;
    return a.localeCompare(b);
  });

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow={t("eyebrow")}
        title={pickLocalized(domain.title, locale)}
        lead={domain.description ? pickLocalized(domain.description, locale) : domain.shortDescription ? pickLocalized(domain.shortDescription, locale) : undefined}
      />
      <Section className="pt-0">
        <Container>
          <Link
            href="/knowledge"
            className="text-sm text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            {t("backToKnowledge")}
          </Link>
        </Container>
      </Section>

      {items.length === 0 ? (
        <Section className="pt-0">
          <Container>
            <Card className="mx-auto max-w-2xl text-center">
              <p className="text-muted">{t("emptyDomain")}</p>
            </Card>
          </Container>
        </Section>
      ) : (
        groupKeys.map((groupKey) => (
          <Section key={groupKey} className="pt-0">
            <Container>
              {groupKey !== "other" ? <SectionHeading title={groupKey} /> : <SectionHeading title={t("itemsTitle")} />}
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groups[groupKey].map((item) => {
                  const itemSlug = slugify(pickLocalized(item.title, locale)) || item.id;
                  return (
                    <Card key={item.id} className="flex flex-col">
                      <h3 className="text-lg">{pickLocalized(item.title, locale)}</h3>
                      {item.shortDescription ? (
                        <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                          {pickLocalized(item.shortDescription, locale)}
                        </p>
                      ) : item.definition ? (
                        <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                          {pickLocalized(item.definition, locale)}
                        </p>
                      ) : null}
                      {item.status ? (
                        <p className="mt-4 text-xs text-muted">{t(`status.${item.status}`)}</p>
                      ) : null}
                      <div className="mt-6">
                        <Link
                          href={`/knowledge/${domainSlug}/${itemSlug}`}
                          className="text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                        >
                          {t("viewDomain")}
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Container>
          </Section>
        ))
      )}
    </>
  );
}
