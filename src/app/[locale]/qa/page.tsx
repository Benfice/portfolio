import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { pickLocalized, pickLocalizedList } from "@/lib/localized";
import { localeAlternates } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Qa" });

  return {
    title: t("title"),
    description: t("lead"),
    alternates: localeAlternates("/qa"),
  };
}

export default async function QaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Qa");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow={t("experienceEyebrow")}
            title={t("experienceTitle")}
          />
          <div className="mt-10 border-l border-border pl-6 sm:pl-8">
            <ol className="space-y-10">
              {experience.map((item) => (
                <li key={item.company} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-6 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent sm:-left-8"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl">
                      {pickLocalized(item.role, locale)} · {item.company}
                    </h3>
                    <p className="text-sm text-muted">{item.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {pickLocalized(item.location, locale)}
                  </p>
                  <p className="mt-3 leading-7">
                    {pickLocalized(item.summary, locale)}
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
                    {pickLocalizedList(item.highlights, locale).map(
                      (highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ),
                    )}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <SectionHeading
            eyebrow={t("skillsEyebrow")}
            title={t("skillsTitle")}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <Card key={group.title.en}>
                <h3 className="text-lg">{pickLocalized(group.title, locale)}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <SectionHeading
            eyebrow={t("projectsEyebrow")}
            title={t("projectsTitle")}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.name} className="flex flex-col">
                <h3 className="text-lg">{project.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                  {pickLocalized(project.description, locale)}
                </p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-xs font-medium uppercase tracking-wide text-muted"
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

      <Section className="pt-0">
        <Container>
          <div className="rounded-3xl border border-border bg-surface px-8 py-12 sm:px-12">
            <SectionHeading
              title={t("ctaTitle")}
              description={t("ctaBody")}
            />
            <div className="mt-8">
              <ButtonLink href="/contact">{t("ctaButton")}</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
