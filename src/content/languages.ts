import type { Localized } from "./types";

export type Language = {
  name: string;
  level: Localized;
};

export const languages: Language[] = [
  {
    name: "Français",
    level: {
      fr: "Natif",
      en: "Native",
      sr: "Maternji",
    },
  },
  {
    name: "English",
    level: {
      fr: "Courant",
      en: "Fluent",
      sr: "Tečno",
    },
  },
  {
    name: "Srpski",
    level: {
      fr: "B2 — Intermédiaire supérieur",
      en: "B2 — Upper Intermediate",
      sr: "B2 — Viši srednji nivo",
    },
  },
];