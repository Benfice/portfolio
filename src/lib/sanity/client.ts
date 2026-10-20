import { createClient } from "next-sanity";
import snapshot from "../../../sanity/snapshot.json";
import { apiVersion, dataset, isConfigured, projectId, readToken } from "./env";

/**
 * A Sanity document as returned by GROQ. Fields are intentionally loosely
 * typed; the mappers in `mappers.ts` pick the values they need.
 */
export type SanityDocument = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

export const CONTENT_TYPES = [
  "profile",
  "about",
  "journeyEvent",
  "experience",
  "project",
  "skillGroup",
  "education",
  "certification",
  "training",
  "language",
  "album",
  "domain",
  "knowledgeItem",
  "knowledgeTheme",
] as const;

export const client = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      ...(readToken ? { token: readToken } : {}),
    })
  : null;

export function isSanityConfigured(): boolean {
  return isConfigured;
}

export async function fetchAllDocuments(): Promise<SanityDocument[]> {
  if (!client) {
    return snapshot as SanityDocument[];
  }

  return client.fetch<SanityDocument[]>(
    `*[_type in $types]`,
    { types: CONTENT_TYPES },
    { next: { revalidate: 60 } },
  );
}