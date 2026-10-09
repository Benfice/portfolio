import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, trainingTopics } from "@/content/certifications";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { languages } from "@/content/languages";
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
                  {item.earlier && (
                    <h3 className="-ml-6 mb-8 border-b border-border pb-3 text-xs font-medium uppercase tracking-wide text-muted sm:-ml-8">
                      {t("earlierExperience")}
                    </h3>
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute -left-6 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent sm:-left-8"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl">
                      {pickLocalized(item.role, locale)} · {item.company}
                    </h3>
                    <p className="text-sm text-muted">
                      {pickLocalized(item.period, locale)}
                    </p>
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
                  {pickLocalizedList(group.items, locale).map((item) => (
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
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.name} className="flex flex-col">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg">{project.name}</h3>
                  <p className="text-sm text-muted">
                    {t("projectsRole")} : {pickLocalized(project.role, locale)}
                  </p>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">
                  {t("projectsClient")} : {project.client}
                </p>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                  {pickLocalized(project.description, locale)}
                </p>
                <p className="mt-5 text-xs font-medium uppercase tracking-wide text-muted">
                  {t("projectsEnvironment")}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {project.environment.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                    >
                      {tool}
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
            eyebrow={t("educationEyebrow")}
            title={t("educationTitle")}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {education.map((item) => (
              <Card key={item.school} className="flex flex-col">
                <h3 className="text-lg">{item.school}</h3>
                <p className="mt-3 flex-1 leading-6">
                  {pickLocalized(item.degree, locale)}
                </p>
                <p className="mt-4 text-sm text-muted">
                  {pickLocalized(item.period, locale)} ·{" "}
                  {pickLocalized(item.location, locale)}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <SectionHeading
            eyebrow={t("certificationsEyebrow")}
            title={t("certificationsTitle")}
          />
          <div className="mt-10 grid gap-6">
            {certifications.map((cert) => (
              <Card key={`${cert.name}-${cert.provider}`}>
                <h3 className="text-lg">{cert.name}</h3>
                <p className="mt-1 text-sm text-muted">{cert.provider}</p>
              </Card>
            ))}
            <Card>
              <h3 className="text-lg">OpenClassrooms · Udemy</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {pickLocalizedList(trainingTopics, locale).map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-border px-3 py-1 text-sm text-muted"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <SectionHeading
            eyebrow={t("languagesEyebrow")}
            title={t("languagesTitle")}
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {languages.map((language) => (
              <li
                key={language.name}
                className="flex items-baseline justify-between gap-4 rounded-2xl border border-border px-6 py-5"
              >
                <span className="font-medium">{language.name}</span>
                <span className="text-sm text-muted">
                  {pickLocalized(language.level, locale)}
                </span>
              </li>
            ))}
          </ul>
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