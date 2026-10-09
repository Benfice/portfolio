import type { Localized, LocalizedList } from "./types";

export type SkillGroup = {
  title: Localized;
  items: LocalizedList;
};

export const skillGroups: SkillGroup[] = [
  {
    title: {
      fr: "Assurance qualité",
      en: "Quality assurance",
      sr: "Osiguranje kvaliteta",
    },
    items: {
      fr: [
        "Tests fonctionnels",
        "Régression / Non-régression",
        "Smoke tests",
        "Tests exploratoires",
        "Tests UI",
        "Tests API",
        "Tests d'intégration",
        "Validation de données",
        "Conception & exécution de tests",
        "Critères d'acceptation",
        "Gestion des anomalies",
        "Risques & amélioration de la qualité",
      ],
      en: [
        "Functional testing",
        "Regression / Non-regression testing",
        "Smoke testing",
        "Exploratory testing",
        "UI testing",
        "API testing",
        "Integration testing",
        "Data validation",
        "Test design & execution",
        "Acceptance criteria",
        "Defect management",
        "Risk identification & quality improvement",
      ],
      sr: [
        "Funkcionalno testiranje",
        "Regresiono / Neregresiono testiranje",
        "Smoke testovi",
        "Eksploratorno testiranje",
        "UI testiranje",
        "API testiranje",
        "Integraciono testiranje",
        "Validacija podataka",
        "Dizajn i izvršavanje testova",
        "Kriterijumi prihvatanja",
        "Upravljanje defektima",
        "Identifikacija rizika i poboljšanje kvaliteta",
      ],
    },
  },
  {
    title: {
      fr: "Gestion QA & processus",
      en: "QA management & processes",
      sr: "QA upravljanje i procesi",
    },
    items: {
      fr: [
        "Définition & amélioration des processus QA",
        "Planification des tests",
        "Analyse des exigences",
        "Gestion des cas de test",
        "Coordination d'équipe QA",
        "Transfert de connaissances & mentorat",
        "KPI / Reporting qualité",
        "Communication avec les parties prenantes",
        "Scrum / Kanban",
      ],
      en: [
        "QA process definition & improvement",
        "Test planning",
        "Requirements analysis",
        "Test case management",
        "QA team coordination",
        "Knowledge transfer & mentoring",
        "KPI / Quality reporting",
        "Stakeholder communication",
        "Scrum / Kanban",
      ],
      sr: [
        "Definisanje i unapređenje QA procesa",
        "Planiranje testova",
        "Analiza zahteva",
        "Upravljanje test slučajevima",
        "Koordinacija QA tima",
        "Transfer znanja i mentorstvo",
        "KPI / Izveštavanje o kvalitetu",
        "Komunikacija sa interesnim stranama",
        "Scrum / Kanban",
      ],
    },
  },
  {
    title: {
      fr: "Outils & technologies",
      en: "Tools & technologies",
      sr: "Alati i tehnologije",
    },
    items: {
      fr: ["Jira", "Confluence", "Zephyr Scale", "TestRail", "Postman", "SQL / MySQL", "DBeaver", "Logs applicatifs", "Grafana", "RabbitMQ", "REST APIs", "Git"],
      en: ["Jira", "Confluence", "Zephyr Scale", "TestRail", "Postman", "SQL / MySQL", "DBeaver", "Application logs", "Grafana", "RabbitMQ", "REST APIs", "Git"],
      sr: ["Jira", "Confluence", "Zephyr Scale", "TestRail", "Postman", "SQL / MySQL", "DBeaver", "Aplikativni logovi", "Grafana", "RabbitMQ", "REST APIs", "Git"],
    },
  },
  {
    title: {
      fr: "Connaissances techniques",
      en: "Technical knowledge",
      sr: "Tehničko znanje",
    },
    items: {
      fr: ["Python", "JavaScript", "Dart", "HTML / CSS", "Django", "Flutter", "Automatisation / Développement web"],
      en: ["Python", "JavaScript", "Dart", "HTML / CSS", "Django", "Flutter", "Basic automation / web development"],
      sr: ["Python", "JavaScript", "Dart", "HTML / CSS", "Django", "Flutter", "Osnove automatizacije / web developmenta"],
    },
  },
];