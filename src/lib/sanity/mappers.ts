import type { Locale } from "@/i18n/routing";
import type { About } from "@/content/about";
import type { Certification } from "@/content/certifications";
import type { Education } from "@/content/education";
import type { Experience } from "@/content/experience";
import type { KnowledgeTheme } from "@/content/knowledge";
import type { Language } from "@/content/languages";
import type { Album, Photo, PhotoRatio } from "@/content/photos";
import type { Profile } from "@/content/profile";
import type { Project } from "@/content/projects";
import type { SkillGroup } from "@/content/skills";
import type { Localized, LocalizedList } from "@/content/types";
import type { SanityDocument } from "./client";

const locales: readonly Locale[] = ["fr", "en", "sr"];

type I18nEntry = { language?: string; value?: string };

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asBoolean(value: unknown): boolean {
  return value === true;
}

function asArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value)
    ? (value as Record<string, unknown>[])
    : [];
}

function asLocalized(value: unknown): Localized {
  const entries: I18nEntry[] = Array.isArray(value)
    ? (value as I18nEntry[])
    : [];
  const result: Localized = { fr: "", en: "", sr: "" };
  for (const entry of entries) {
    if (entry.language && localeIndexOf(entry.language) !== -1) {
      result[entry.language as Locale] = entry.value ?? "";
    }
  }
  return result;
}

function asLocalizedList(value: unknown, valueKey: "value" | "text"): LocalizedList {
  const result: LocalizedList = { fr: [], en: [], sr: [] };
  for (const item of asArray(value)) {
    const source = valueKey === "text" ? item.text : item.value;
    const localized = asLocalized(source);
    for (const locale of locales) {
      result[locale].push(localized[locale]);
    }
  }
  return result;
}

function asStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.map((entry) => asString(entry)) : [];
}

function asRatios(value: unknown): PhotoRatio | undefined {
  if (value === "portrait" || value === "landscape" || value === "square") {
    return value;
  }
  return undefined;
}

function localeIndexOf(language: string): number {
  return locales.indexOf(language as Locale);
}

export function mapProfile(document: SanityDocument | undefined): Profile {
  return {
    name: asString(document?.name),
    role: asLocalized(document?.role),
    location: asLocalized(document?.location),
    availability: asLocalized(document?.availability),
    email: asString(document?.email),
    socials: asArray(document?.socials).map((social) => ({
      label: asString(social.label),
      href: asString(social.href),
    })),
  };
}

export function mapAbout(document: SanityDocument | undefined): About {
  return {
    intro: asLocalized(document?.intro),
    paragraphs: asLocalizedList(document?.paragraphs, "value"),
    principles: asLocalizedList(document?.principles, "value"),
  };
}

export function mapExperience(document: SanityDocument | undefined): Experience {
  return {
    company: asString(document?.company),
    role: asLocalized(document?.role),
    period: asLocalized(document?.period),
    location: asLocalized(document?.location),
    summary: asLocalized(document?.summary),
    highlights: asLocalizedList(document?.highlights, "text"),
    earlier: asBoolean(document?.earlier),
  };
}

export function mapProject(document: SanityDocument | undefined): Project {
  return {
    name: asString(document?.name),
    client: asString(document?.client),
    role: asLocalized(document?.role),
    description: asLocalized(document?.description),
    environment: asStringList(document?.environment),
  };
}

export function mapSkillGroup(document: SanityDocument | undefined): SkillGroup {
  return {
    title: asLocalized(document?.title),
    items: asLocalizedList(document?.items, "value"),
  };
}

export function mapEducation(document: SanityDocument | undefined): Education {
  return {
    school: asString(document?.school),
    degree: asLocalized(document?.degree),
    period: asLocalized(document?.period),
    location: asLocalized(document?.location),
  };
}

export function mapCertification(
  document: SanityDocument | undefined,
): Certification {
  return {
    name: asString(document?.name),
    provider: asString(document?.provider),
  };
}

export function mapTrainingTopics(
  document: SanityDocument | undefined,
): LocalizedList {
  return asLocalizedList(document?.topics, "value");
}

export function mapLanguage(document: SanityDocument | undefined): Language {
  return {
    name: asString(document?.name),
    level: asLocalized(document?.level),
  };
}

export function mapAlbum(
  document: SanityDocument | undefined,
  photoUrl: (image: { asset?: { _ref?: string } } | null | undefined) => string | null,
): Album {
  const photos: Photo[] = asArray(document?.photos).map((photo, index) => ({
    id: asString(photo._key) || `photo-${index}`,
    title: asLocalized(photo.title),
    location: asString(photo.location),
    year: asString(photo.year),
    ratio: asRatios(photo.ratio) ?? "square",
    src: photoUrl(photo.image as { asset?: { _ref?: string } } | undefined),
  }));

  return {
    id: asString(document?._id),
    title: asLocalized(document?.title),
    description: asLocalized(document?.description),
    photos,
  };
}

export function mapKnowledgeTheme(
  document: SanityDocument | undefined,
): KnowledgeTheme {
  return {
    id: asString(document?._id) || "theme",
    title: asLocalized(document?.title),
    description: asLocalized(document?.description),
    concepts: asArray(document?.concepts).map((concept, index) => ({
      id: asString(concept.id) || `concept-${index}`,
      title: asLocalized(concept.title),
      summary: asLocalized(concept.summary),
      tags: asStringList(concept.tags),
    })),
  };
}