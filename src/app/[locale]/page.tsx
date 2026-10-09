import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/lib/metadata";
import { pickLocalized } from "@/lib/localized";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;

  return { alternates: localeAlternates("/") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  const highlights = [
    {
      href: "/qa",
      title: t("qaTitle"),
      body: t("qaBody"),
      link: t("qaLink"),
    },
    {
      href: "/photography",
      title: t("photographyTitle"),
      body: t("photographyBody"),
      link: t("photographyLink"),
    },
    {
      href: "/knowledge",
      title: t("knowledgeTitle"),
      body: t("knowledgeBody"),
      link: t("knowledgeLink"),
    },
  ];

  return (
    <>
      <Section className="pt-20 sm:pt-28">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl tracking-tight sm:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-muted">
            {t("lead")}
          </p>
          <p className="mt-4 text-sm text-muted">
            {profile.name} · {pickLocalized(profile.location, locale)}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/qa">{t("exploreQa")}</ButtonLink>
            <ButtonLink href="/photography" variant="secondary">
              {t("explorePhotography")}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <SectionHeading
            eyebrow={t("highlightsEyebrow")}
            title={t("highlightsTitle")}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <Card key={item.href} className="flex flex-col">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  className="mt-6 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                >
                  {item.link}{" "}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="rounded-3xl border border-border bg-surface px-8 py-12 sm:px-12 sm:py-16">
            <SectionHeading
              eyebrow={t("contactEyebrow")}
              title={t("contactTitle")}
              description={t("contactBody")}
            />
            <div className="mt-8">
              <ButtonLink href="/contact">{t("contactCta")}</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
