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
import { getDomains, getKnowledgeItems } from "@/lib/sanity/content";
import { pickLocalized } from "@/lib/localized";
import { buildPageMetadata } from "@/lib/metadata";
import { getBaseUrl } from "@/lib/site";
import { buildBreadcrumbs } from "@/lib/structured-data";
import { slugify } from "@/lib/slugify";

function toSlug(id: string, title: string): string {
  return slugify(title) || id;
}

export async function generateStaticParams() {
  const [domains, items] = await Promise.all([getDomains(), getKnowledgeItems()]);
  const params: Array<{ domainSlug: string; itemSlug: string }> = [];
  for (const item of items) {
    const domain = domains.find((d) => d.id === item.domainId || item.domainIds.includes(d.id));
    if (!domain) continue;
    const domainSlug = toSlug(domain.id, pickLocalized(domain.title, "fr"));
    const itemSlug = toSlug(item.id, pickLocalized(item.title, "fr"));
    params.push({ domainSlug, itemSlug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; domainSlug: string; itemSlug: string }>;
}): Promise<Metadata> {
  const { locale, domainSlug, itemSlug } = await params;
  const [domains, items] = await Promise.all([getDomains(), getKnowledgeItems()]);
  const domain = domains.find(
    (d) => toSlug(d.id, pickLocalized(d.title, locale)) === domainSlug || toSlug(d.id, pickLocalized(d.title, "fr")) === domainSlug || d.id === domainSlug,
  );
  if (!domain) return {};
  const item = items.find(
    (i) =>
      (i.domainId === domain.id || i.domainIds.includes(domain.id)) &&
      (toSlug(i.id, pickLocalized(i.title, locale)) === itemSlug || toSlug(i.id, pickLocalized(i.title, "fr")) === itemSlug),
  );
  if (!item) return {};
  const desc = item.shortDescription || item.definition;
  return buildPageMetadata({
    locale,
    path: `/knowledge/${domainSlug}/${itemSlug}`,
    absoluteTitle: pickLocalized(item.title, locale),
    description: desc ? pickLocalized(desc, locale) : undefined,
  });
}

export default async function KnowledgeItemPage({
  params,
}: {
  params: Promise<{ locale: string; domainSlug: string; itemSlug: string }>;
}) {
  const { locale, domainSlug, itemSlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Knowledge");
  const nav = await getTranslations("Nav");
  const [domains, items, allItems] = await Promise.all([
    getDomains(),
    getKnowledgeItems(),
    getKnowledgeItems(),
  ]);
  const domain = domains.find(
    (d) => toSlug(d.id, pickLocalized(d.title, locale)) === domainSlug || toSlug(d.id, pickLocalized(d.title, "fr")) === domainSlug || d.id === domainSlug,
  );
  if (!domain) notFound();
  const item = items.find(
    (i) =>
      (i.domainId === domain.id || i.domainIds.includes(domain.id)) &&
      (toSlug(i.id, pickLocalized(i.title, locale)) === itemSlug || toSlug(i.id, pickLocalized(i.title, "fr")) === itemSlug),
  );
  if (!item) notFound();

  const breadcrumbs = buildBreadcrumbs({
    base: getBaseUrl(),
    locale,
    items: [
      { name: nav("home"), path: "/" },
      { name: nav("knowledge"), path: "/knowledge" },
      { name: pickLocalized(domain.title, locale), path: `/knowledge/${domainSlug}` },
      { name: pickLocalized(item.title, locale), path: `/knowledge/${domainSlug}/${itemSlug}` },
    ],
  });

  const relatedItems = allItems.filter((it) => item.relatedKnowledgeIds.includes(it.id)).slice(0, 12);


  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHeader eyebrow={t("eyebrow")} title={pickLocalized(item.title, locale)} />
      <Section className="pt-0">
        <Container>
          <Link
            href={`/knowledge/${domainSlug}`}
            className="text-sm text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            {t("backToDomain")}
          </Link>
        </Container>
      </Section>

      {item.definition ? (
        <Section className="pt-0">
          <Container className="max-w-3xl">
            <SectionHeading title={t("definition")} />
            <p className="mt-6 text-lg leading-8 text-muted whitespace-pre-line">{pickLocalized(item.definition, locale)}</p>
          </Container>
        </Section>
      ) : null}

      {item.explanation ? (
        <Section className="pt-0">
          <Container className="max-w-3xl">
            <SectionHeading title={t("explanation")} />
            <div className="mt-6 space-y-4 text-muted leading-7 whitespace-pre-line">
              {pickLocalized(item.explanation, locale).split(/\n\n+/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {item.example ? (
        <Section className="pt-0">
          <Container className="max-w-3xl">
            <SectionHeading title={t("example")} />
            <div className="mt-6 space-y-4 text-muted leading-7 whitespace-pre-line">
              {pickLocalized(item.example, locale).split(/\n\n+/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {item.practicalApplication ? (
        <Section className="pt-0">
          <Container className="max-w-3xl">
            <SectionHeading title={t("practicalApplication")} />
            <div className="mt-6 space-y-4 text-muted leading-7 whitespace-pre-line">
              {pickLocalized(item.practicalApplication, locale).split(/\n\n+/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {item.status ? (
        <Section className="pt-0">
          <Container>
            <SectionHeading title={t("statusTitle")} />
            <p className="mt-6 text-muted">{t(`status.${item.status}`)}</p>
          </Container>
        </Section>
      ) : null}

      {relatedItems.length > 0 ? (
        <Section className="pt-0">
          <Container>
            <SectionHeading title={t("relatedKnowledge")} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedItems.map((rel) => {
                const relDomain = domains.find((d) => d.id === rel.domainId || rel.domainIds.includes(d.id));
                if (!relDomain) return null;
                const rds = toSlug(relDomain.id, pickLocalized(relDomain.title, locale));
                const ris = toSlug(rel.id, pickLocalized(rel.title, locale));
                return (
                  <Card key={rel.id} className="flex flex-col">
                    <h3 className="text-lg">{pickLocalized(rel.title, locale)}</h3>
                    {rel.shortDescription ? (
                      <p className="mt-3 flex-1 text-sm leading-6 text-muted line-clamp-3">
                        {pickLocalized(rel.shortDescription, locale)}
                      </p>
                    ) : null}
                    <div className="mt-6">
                      <Link
                        href={`/knowledge/${rds}/${ris}`}
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
      ) : null}

      {item.relatedTools.length > 0 ? (
        <Section className="pt-0">
          <Container>
            <SectionHeading title={t("relatedTools")} />
            <ul className="mt-6 flex flex-wrap gap-2">
              {item.relatedTools.map((tool) => (
                <li key={tool} className="rounded-full border border-border px-2.5 py-0.5 text-sm text-muted">
                  {tool}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {item.externalResources.length > 0 ? (
        <Section className="pt-0">
          <Container>
            <SectionHeading title={t("externalResources")} />
            <ul className="mt-6 space-y-2">
              {item.externalResources.map((res, i) => (
                <li key={i}>
                  <a
                    href={res.href}
                    className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                    {...(!res.internal && /^https?:\/\//.test(res.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {pickLocalized(res.label, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
