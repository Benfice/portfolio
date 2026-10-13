import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAbout, getProfile } from "@/lib/sanity/content";
import { pickLocalized, pickLocalizedList } from "@/lib/localized";
import { buildPageMetadata } from "@/lib/metadata";
import { getBaseUrl } from "@/lib/site";
import { buildBreadcrumbs } from "@/lib/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  const about = await getAbout();

  return buildPageMetadata({
    locale,
    path: "/about",
    absoluteTitle: t("metaTitle"),
    description: pickLocalized(about.intro, locale),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const nav = await getTranslations("Nav");
  const [about, profile] = await Promise.all([getAbout(), getProfile()]);
  const breadcrumbs = buildBreadcrumbs({
    base: getBaseUrl(),
    locale,
    items: [
      { name: nav("home"), path: "/" },
      { name: nav("about"), path: "/about" },
    ],
  });

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow={t("eyebrow")}
        title={profile.name}
        lead={pickLocalized(about.intro, locale)}
      />

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <div className="space-y-6 text-lg leading-8 text-muted">
            {pickLocalizedList(about.paragraphs, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <SectionHeading title={t("principlesTitle")} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {pickLocalizedList(about.principles, locale).map((principle) => (
              <li key={principle} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/contact">{t("ctaButton")}</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
