import type { Localized, LocalizedList } from "./types";

export type Experience = {
  company: string;
  role: Localized;
  period: string;
  location: Localized;
  summary: Localized;
  highlights: LocalizedList;
};

export const experience: Experience[] = [
  {
    company: "Studio Lumière",
    role: {
      fr: "QA Lead",
      en: "QA Lead",
      sr: "QA Lead",
    },
    period: "2022 — aujourd'hui",
    location: {
      fr: "Paris, France",
      en: "Paris, France",
      sr: "Pariz, Francuska",
    },
    summary: {
      fr: "Pilotage de la stratégie de test d'une plateforme produit multi-équipes.",
      en: "Leading the test strategy for a multi-team product platform.",
      sr: "Vođenje strategije testiranja platforme koju razvija više timova.",
    },
    highlights: {
      fr: [
        "Définition de la stratégie de test et des critères de qualité.",
        "Mise en place d'une suite E2E Playwright exécutée en CI.",
        "Mentorat de deux QA et animation des revues de qualité.",
      ],
      en: [
        "Defined the test strategy and quality gates.",
        "Built a Playwright E2E suite running in CI.",
        "Mentored two QA engineers and ran quality reviews.",
      ],
      sr: [
        "Definisanje strategije testiranja i kriterijuma kvaliteta.",
        "Uspostavljanje Playwright E2E suite-a u CI-ju.",
        "Mentorstvo dvoje QA inženjera i vođenje revizija kvaliteta.",
      ],
    },
  },
  {
    company: "Northwind Software",
    role: {
      fr: "QA Engineer",
      en: "QA Engineer",
      sr: "QA inženjer",
    },
    period: "2019 — 2022",
    location: {
      fr: "À distance",
      en: "Remote",
      sr: "Na daljinu",
    },
    summary: {
      fr: "Automatisation des tests d'une API SaaS et fiabilisation des livraisons.",
      en: "Automated testing for a SaaS API and made releases reliable.",
      sr: "Automatizacija testiranja SaaS API-ja i pouzdaniji release-ovi.",
    },
    highlights: {
      fr: [
        "Couverture des parcours critiques par des tests d'API automatisés.",
        "Réduction du temps de non-régression de 3 jours à 4 heures.",
        "Collaboration étroite avec les développeurs en TDD.",
      ],
      en: [
        "Covered critical flows with automated API tests.",
        "Cut regression time from 3 days to 4 hours.",
        "Worked closely with developers using TDD.",
      ],
      sr: [
        "Pokrivanje kritičnih tokova automatizovanim API testovima.",
        "Skraćenje vremena regresije sa 3 dana na 4 sata.",
        "Bliska saradnja sa developerima kroz TDD.",
      ],
    },
  },
  {
    company: "Atelier Données",
    role: {
      fr: "QA Analyst",
      en: "QA Analyst",
      sr: "QA analitičar",
    },
    period: "2017 — 2019",
    location: {
      fr: "Lyon, France",
      en: "Lyon, France",
      sr: "Lion, Francuska",
    },
    summary: {
      fr: "Qualification fonctionnelle d'applications métier et suivi des anomalies.",
      en: "Functional testing of business applications and defect tracking.",
      sr: "Funkcionalno testiranje poslovnih aplikacija i praćenje grešaka.",
    },
    highlights: {
      fr: [
        "Rédaction des cas de test et des plans de recette.",
        "Mise en place d'un processus de suivi des anomalies.",
        "Premiers pas dans l'automatisation des tests.",
      ],
      en: [
        "Wrote test cases and acceptance plans.",
        "Set up a defect tracking process.",
        "First steps into test automation.",
      ],
      sr: [
        "Pisanje test slučajeva i planova prihvatanja.",
        "Uspostavljanje procesa praćenja grešaka.",
        "Prvi koraci u automatizaciji testiranja.",
      ],
    },
  },
];
