import type { About } from "@/content/about";
import type { Certification } from "@/content/certifications";
import type { Education } from "@/content/education";
import type { Experience } from "@/content/experience";
import type { KnowledgeTheme } from "@/content/knowledge";
import type { Language } from "@/content/languages";
import type { Album } from "@/content/photos";
import type { Profile } from "@/content/profile";
import type { Project } from "@/content/projects";
import type { SkillGroup } from "@/content/skills";
import type { LocalizedList } from "@/content/types";
import { fetchAllDocuments, type SanityDocument } from "./client";
import { getPhotoUrl } from "./image";
import {
  mapAbout,
  mapAlbum,
  mapCertification,
  mapEducation,
  mapExperience,
  mapKnowledgeTheme,
  mapLanguage,
  mapProfile,
  mapProject,
  mapSkillGroup,
  mapTrainingTopics,
} from "./mappers";

function findOne(
  documents: SanityDocument[],
  type: string,
): SanityDocument | undefined {
  return documents.find((document) => document._type === type);
}

function findMany(documents: SanityDocument[], type: string): SanityDocument[] {
  return documents
    .filter((document) => document._type === type)
    .sort((a, b) => {
      const orderA = typeof a.order === "number" ? a.order : Number.MAX_SAFE_INTEGER;
      const orderB = typeof b.order === "number" ? b.order : Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });
}

function ensureEntry(
  document: SanityDocument | undefined,
  fallback: SanityDocument,
): SanityDocument {
  return document ?? fallback;
}

const emptyDocument: SanityDocument = {
  _id: "empty",
  _type: "empty",
  name: "",
  role: undefined,
  location: undefined,
  availability: undefined,
  email: "",
  socials: [],
  intro: undefined,
  paragraphs: [],
  principles: [],
  company: "",
  earlier: false,
  period: undefined,
  summary: undefined,
  highlights: [],
  client: "",
  description: undefined,
  environment: [],
  title: undefined,
  items: [],
  school: "",
  degree: undefined,
  provider: "",
  topics: [],
  level: undefined,
  photos: [],
  concepts: [],
};

export async function getProfile(): Promise<Profile> {
  const documents = await fetchAllDocuments();
  return mapProfile(ensureEntry(findOne(documents, "profile"), emptyDocument));
}

export async function getAbout(): Promise<About> {
  const documents = await fetchAllDocuments();
  return mapAbout(ensureEntry(findOne(documents, "about"), emptyDocument));
}

export async function getExperience(): Promise<Experience[]> {
  const documents = await fetchAllDocuments();
  return findMany(documents, "experience").map(mapExperience);
}

export async function getProjects(): Promise<Project[]> {
  const documents = await fetchAllDocuments();
  return findMany(documents, "project").map(mapProject);
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  const documents = await fetchAllDocuments();
  return findMany(documents, "skillGroup").map(mapSkillGroup);
}

export async function getEducation(): Promise<Education[]> {
  const documents = await fetchAllDocuments();
  return findMany(documents, "education").map(mapEducation);
}

export async function getCertifications(): Promise<Certification[]> {
  const documents = await fetchAllDocuments();
  return findMany(documents, "certification").map(mapCertification);
}

export async function getTrainingTopics(): Promise<LocalizedList> {
  const documents = await fetchAllDocuments();
  return mapTrainingTopics(
    ensureEntry(findOne(documents, "training"), emptyDocument),
  );
}

export async function getLanguages(): Promise<Language[]> {
  const documents = await fetchAllDocuments();
  return findMany(documents, "language").map(mapLanguage);
}

export async function getAlbums(): Promise<Album[]> {
  const documents = await fetchAllDocuments();
  return findMany(documents, "album").map((document) =>
    mapAlbum(document, getPhotoUrl),
  );
}

export async function getKnowledgeThemes(): Promise<KnowledgeTheme[]> {
  const documents = await fetchAllDocuments();
  return findMany(documents, "knowledgeTheme").map(mapKnowledgeTheme);
}