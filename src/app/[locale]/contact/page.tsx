import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ButtonAnchor } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { profile } from "@/content/profile";
import { pickLocalized } from "@/lib/localized";
import { localeAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("title"),
    description: t("lead"),
    alternates: localeAlternates("/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      <Section className="pt-0">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="flex flex-col">
              <h2 className="text-lg">{t("emailLabel")}</h2>
              <p className="mt-3 flex-1 text-muted">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-accent transition-opacity hover:opacity-80"
                >
                  {profile.email}
                </a>
              </p>
              <div className="mt-6">
                <ButtonAnchor href={`mailto:${profile.email}`}>
                  {t("emailLabel")}
                </ButtonAnchor>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg">{t("socialsTitle")}</h2>
              <ul className="mt-3 space-y-2 text-muted">
                {profile.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent transition-opacity hover:opacity-80"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted">{t("locationLabel")}</dt>
              <dd className="mt-1">
                {pickLocalized(profile.location, locale)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">{t("availabilityLabel")}</dt>
              <dd className="mt-1">
                {pickLocalized(profile.availability, locale)}
              </dd>
            </div>
          </dl>
        </Container>
      </Section>
    </>
  );
}
