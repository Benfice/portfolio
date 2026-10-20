import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { getJourneyEvents } from "@/lib/sanity/content";
import { pickLocalized } from "@/lib/localized";
import { buildPageMetadata } from "@/lib/metadata";
import { getBaseUrl } from "@/lib/site";
import { buildBreadcrumbs } from "@/lib/structured-data";
import { journeyCategoryLabels } from "@/content/journey";

function getMonthName(locale: string, month: number) {
  try {
    return new Intl.DateTimeFormat(locale, { month: "long" }).format(
      new Date(Date.UTC(2000, month - 1, 1)),
    );
  } catch {
    return String(month);
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Journey" });

  return buildPageMetadata({
    locale,
    path: "/journey",
    absoluteTitle: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Journey");
  const nav = await getTranslations("Nav");
  const events = await getJourneyEvents();

  const breadcrumbs = buildBreadcrumbs({
    base: getBaseUrl(),
    locale,
    items: [
      { name: nav("home"), path: "/" },
      { name: nav("journey"), path: "/journey" },
    ],
  });

  const grouped = events.reduce<Record<number, typeof events>>((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {});

  const years = Object.keys(grouped)
    .map((year) => Number(year))
    .filter((year) => grouped[year] && grouped[year].length > 0)
    .sort((a, b) => b - a);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      {years.length === 0 ? (
        <Section className="pt-0">
          <Container>
            <Card className="mx-auto max-w-2xl text-center">
              <p className="text-lg text-muted">{t("emptyState")}</p>
            </Card>
          </Container>
        </Section>
      ) : (
        <Section className="pt-0">
          <Container>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute left-4 top-0 bottom-0 w-px bg-border sm:left-6"
              />
              <div className="space-y-12">
                {years.map((year) => (
                  <div key={year} className="relative">
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background sm:h-12 sm:w-12">
                        <span className="text-sm font-medium sm:text-base">
                          {year}
                        </span>
                      </div>
                      <SectionHeading title={String(year)} className="mt-0" />
                    </div>
                    <ol className="mt-8 ml-12 space-y-6 sm:ml-16 sm:space-y-8">
                      {grouped[year].map((event) => (
                        <li key={event.id} className="relative">
                          <Card className="flex flex-col gap-4">
                            <div className="flex flex-wrap items-center gap-3">
                              {typeof event.month === "number" ? (
                                <span className="text-sm text-muted">
                                  {getMonthName(locale, event.month)}
                                </span>
                              ) : null}
                              {event.category ? (
                                <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                                  {pickLocalized(journeyCategoryLabels[event.category], locale)}
                                </span>
                              ) : null}
                            </div>
                            <div>
                              <h3 className="text-xl tracking-tight sm:text-2xl">
                                {pickLocalized(event.title, locale)}
                              </h3>
                              {event.description ? (
                                <div className="mt-3 space-y-4 text-muted leading-7">
                                  {pickLocalized(event.description, locale)
                                    .split(/\n\n+/)
                                    .map((paragraph, idx) => (
                                      <p key={`${event.id}-p-${idx}`}>{paragraph}</p>
                                    ))}
                                </div>
                              ) : null}
                            </div>
                            {event.image ? (
                              <div className="overflow-hidden rounded-lg border border-border">
                                <Image
                                  src={event.image}
                                  alt={
                                    event.imageAlt
                                      ? pickLocalized(event.imageAlt, locale)
                                      : pickLocalized(event.title, locale)
                                  }
                                  width={1200}
                                  height={800}
                                  className="h-auto w-full"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                                />
                              </div>
                            ) : null}
                            {event.relatedLinks && event.relatedLinks.length > 0 ? (
                              <div className="flex flex-wrap gap-3">
                                {event.relatedLinks.map((link, idx) => (
                                  <Link
                                    key={`${event.id}-link-${idx}`}
                                    href={link.href}
                                    className="text-sm underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                                    {...(!link.internal && /^https?:\/\//.test(link.href)
                                      ? { target: "_blank", rel: "noopener noreferrer" }
                                      : {})}
                                  >
                                    {pickLocalized(link.label, locale)}
                                  </Link>
                                ))}
                              </div>
                            ) : null}
                          </Card>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
