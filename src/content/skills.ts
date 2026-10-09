import type { Localized } from "./types";

export type SkillGroup = {
  title: Localized;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: {
      fr: "Stratégie & process",
      en: "Strategy & process",
      sr: "Strategija i procesi",
    },
    items: [
      "Plan de test",
      "Analyse de risque",
      "TDD / BDD",
      "Gestion des anomalies",
    ],
  },
  {
    title: {
      fr: "Automatisation",
      en: "Automation",
      sr: "Automatizacija",
    },
    items: ["Playwright", "Cypress", "Vitest", "Tests d'API"],
  },
  {
    title: {
      fr: "CI/CD & outils",
      en: "CI/CD & tooling",
      sr: "CI/CD i alati",
    },
    items: ["GitHub Actions", "Docker", "Git", "Observabilité"],
  },
  {
    title: {
      fr: "Leadership & communication",
      en: "Leadership & communication",
      sr: "Liderstvo i komunikacija",
    },
    items: ["Mentorat", "Revues de qualité", "Documentation", "Agile / Scrum"],
  },
];
