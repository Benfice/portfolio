import type { LocalizedList } from "./types";

export type Certification = {
  name: string;
  provider: string;
};

export const certifications: Certification[] = [
  {
    name: "Computer Science for Web Programming",
    provider: "HarvardX",
  },
];

export const trainingTopics: LocalizedList = {
  fr: [
    "Tests logiciels & QA",
    "Méthodologies agiles",
    "JavaScript",
    "Python",
    "SQL",
    "Git / GitHub",
    "Développement web",
    "Django",
    "Flutter",
    "HTML / CSS",
    "IA",
  ],
  en: [
    "Software testing & QA",
    "Agile methodologies",
    "JavaScript",
    "Python",
    "SQL",
    "Git / GitHub",
    "Web development",
    "Django",
    "Flutter",
    "HTML / CSS",
    "AI",
  ],
  sr: [
    "Testiranje softvera i QA",
    "Agile metodologije",
    "JavaScript",
    "Python",
    "SQL",
    "Git / GitHub",
    "Web development",
    "Django",
    "Flutter",
    "HTML / CSS",
    "AI",
  ],
};