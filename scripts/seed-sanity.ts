import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { about } from "../src/content/about";
import { certifications, trainingTopics } from "../src/content/certifications";
import { education } from "../src/content/education";
import { experience } from "../src/content/experience";
import { knowledgeThemes } from "../src/content/knowledge";
import { languages } from "../src/content/languages";
import { albums } from "../src/content/photos";
import { profile } from "../src/content/profile";
import { projects } from "../src/content/projects";
import { skillGroups } from "../src/content/skills";
import type { Locale } from "../src/i18n/routing";

const locales: Locale[] = ["fr", "en", "sr"];

const envFile = path.resolve(process.cwd(), ".env.local");
if (existsSync(envFile)) {
  (process as { loadEnvFile?: (file?: string) => void }).loadEnvFile?.(envFile);
}

function toI18n(field: Record<Locale, string>): { language: string; value: string }[] {
  return locales.map((language) => ({ language, value: field[language] }));
}

function toI18nList(
  field: Record<Locale, string[]>,
  index: number,
): { language: string; value: string }[] {
  return locales.map((language) => ({
    language,
    value: field[language][index] ?? "",
  }));
}

function toItems(
  field: Record<Locale, string[]>,
): { _key: string; value: { language: string; value: string }[] }[] {
  return field.fr.map((_, index) => ({
    _key: `item-${index}`,
    value: toI18nList(field, index),
  }));
}

type Doc = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

export function buildDocuments(): Doc[] {
  const documents: Doc[] = [];

  documents.push({
    _id: "portfolioProfile",
    _type: "profile",
    name: profile.name,
    email: profile.email,
    role: toI18n(profile.role),
    location: toI18n(profile.location),
    availability: toI18n(profile.availability),
    socials: profile.socials.map((social, index) => ({
      _key: `social-${index}`,
      label: social.label,
      href: social.href,
    })),
  });

  documents.push({
    _id: "portfolioAbout",
    _type: "about",
    intro: toI18n(about.intro),
    paragraphs: toItems(about.paragraphs),
    principles: toItems(about.principles),
  });

  documents.push({
    _id: "portfolioTraining",
    _type: "training",
    providerTitle: "OpenClassrooms · Udemy",
    topics: toItems(trainingTopics),
  });

  experience.forEach((item, index) => {
    documents.push({
      _id: `experience-${index}`,
      _type: "experience",
      order: index,
      company: item.company,
      earlier: item.earlier ?? false,
      role: toI18n(item.role),
      period: toI18n(item.period),
      location: toI18n(item.location),
      summary: toI18n(item.summary),
      highlights: item.highlights.fr.map((_, highlightIndex) => ({
        _key: `highlight-${highlightIndex}`,
        text: toI18nList(item.highlights, highlightIndex),
      })),
    });
  });

  projects.forEach((project, index) => {
    documents.push({
      _id: `project-${index}`,
      _type: "project",
      order: index,
      name: project.name,
      client: project.client,
      role: toI18n(project.role),
      description: toI18n(project.description),
      environment: project.environment,
    });
  });

  skillGroups.forEach((group, index) => {
    documents.push({
      _id: `skillGroup-${index}`,
      _type: "skillGroup",
      order: index,
      title: toI18n(group.title),
      items: toItems(group.items),
    });
  });

  education.forEach((item, index) => {
    documents.push({
      _id: `education-${index}`,
      _type: "education",
      order: index,
      school: item.school,
      degree: toI18n(item.degree),
      period: toI18n(item.period),
      location: toI18n(item.location),
    });
  });

  certifications.forEach((cert, index) => {
    documents.push({
      _id: `certification-${index}`,
      _type: "certification",
      order: index,
      name: cert.name,
      provider: cert.provider,
    });
  });

  languages.forEach((language, index) => {
    documents.push({
      _id: `language-${index}`,
      _type: "language",
      order: index,
      name: language.name,
      level: toI18n(language.level),
    });
  });

  albums.forEach((album, index) => {
    documents.push({
      _id: `album-${index}`,
      _type: "album",
      order: index,
      title: toI18n(album.title),
      description: toI18n(album.description),
      photos: album.photos.map((photo, photoIndex) => ({
        _key: `photo-${photoIndex}`,
        title: toI18n(photo.title),
        location: photo.location,
        year: photo.year,
        ratio: photo.ratio,
      })),
    });
  });

  knowledgeThemes.forEach((theme, index) => {
    documents.push({
      _id: `knowledgeTheme-${index}`,
      _type: "knowledgeTheme",
      order: index,
      title: toI18n(theme.title),
      description: toI18n(theme.description),
      concepts: theme.concepts.map((concept, conceptIndex) => ({
        _key: `concept-${conceptIndex}`,
        id: concept.id,
        title: toI18n(concept.title),
        summary: toI18n(concept.summary),
        tags: concept.tags,
      })),
    });
  });

  return documents;
}

async function main(): Promise<void> {
  const documents = buildDocuments();

  const snapshotDir = path.resolve(process.cwd(), "sanity");
  mkdirSync(snapshotDir, { recursive: true });
  writeFileSync(
    path.join(snapshotDir, "snapshot.json"),
    `${JSON.stringify(documents, null, 2)}\n`,
  );
  console.log(`Wrote sanity/snapshot.json (${documents.length} documents).`);

  await syncToSanity(documents);
}

async function syncToSanity(documents: Doc[]): Promise<void> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
    console.log(
      "Skipping dataset sync: NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_WRITE_TOKEN are not set.",
    );
    return;
  }

  const { createClient } = await import("@sanity/client");
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2026-09-01",
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  });

  for (const document of documents) {
    await client.createOrReplace(document);
  }
  console.log(`Synced ${documents.length} documents to the Sanity dataset.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});