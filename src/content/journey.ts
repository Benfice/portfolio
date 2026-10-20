import type { Localized } from "./types";

export type JourneyCategory =
  | "personal"
  | "education"
  | "professional"
  | "photography"
  | "projects"
  | "learning";

export interface JourneyLink {
  label: Localized;
  href: string;
  internal?: boolean;
}

export interface JourneyEvent {
  id: string;
  year: number;
  month?: number;
  order: number;
  title: Localized;
  description?: Localized;
  image?: string | null;
  imageAlt?: Localized;
  category?: JourneyCategory;
  relatedLinks: JourneyLink[];
}

export const journeyCategoryLabels: Record<JourneyCategory, Localized> = {
  personal: {
    fr: "Personnel",
    en: "Personal",
    sr: "Lično",
  },
  education: {
    fr: "Formation",
    en: "Education",
    sr: "Obrazovanje",
  },
  professional: {
    fr: "Expérience professionnelle",
    en: "Professional experience",
    sr: "Profesionalno iskustvo",
  },
  photography: {
    fr: "Photographie",
    en: "Photography",
    sr: "Fotografija",
  },
  projects: {
    fr: "Projets",
    en: "Projects",
    sr: "Projekti",
  },
  learning: {
    fr: "Apprentissage",
    en: "Learning",
    sr: "Učenje",
  },
};
