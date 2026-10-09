import type { Localized } from "./types";

export type Project = {
  name: string;
  client: string;
  role: Localized;
  description: Localized;
  environment: string[];
};

export const projects: Project[] = [
  {
    name: "Bulldozer",
    client: "Retail Ecommerce Ventures",
    role: {
      fr: "QA Engineer → QA Lead",
      en: "QA Engineer → QA Lead",
      sr: "QA inženjer → QA Lead",
    },
    description: {
      fr: "Plateforme B2B de communication et CRM : messagerie, gestion des contacts, tâches, appels, calendrier et collaboration. Intégré dès le tout début du développement ; le produit n'est pas allé en production.",
      en: "B2B communication and CRM platform combining messaging, contact management, task management, calls, calendar and collaboration. Joined at the very start of development; the product never reached production.",
      sr: "B2B platforma za komunikaciju i CRM: poruke, upravljanje kontaktima, zadaci, pozivi, kalendar i saradnja. Uključen od samog početka razvoja; proizvod nikada nije ušao u produkciju.",
    },
    environment: ["Applications mobiles", "Application web", "Jira", "Confluence", "Zephyr Scale", "Android Studio"],
  },
  {
    name: "Workforce Timesheet Processing",
    client: "Oakland Group",
    role: {
      fr: "QA Engineer → QA Lead",
      en: "QA Engineer → QA Lead",
      sr: "QA inženjer → QA Lead",
    },
    description: {
      fr: "Plateforme en production qui automatise la collecte, la transformation, la validation et l'intégration des données de temps de travail des travailleurs depuis plusieurs sources et formats propres à chaque client.",
      en: "Production platform automating the collection, transformation, validation and integration of worker timesheet data from multiple sources and client-specific formats.",
      sr: "Produkciona platforma koja automatizuje prikupljanje, transformaciju, validaciju i integraciju podataka o radnom vremenu radnika iz više izvora i klijentskih formata.",
    },
    environment: ["Dataviz", "SQL", "Workflows e-mail", "Jira", "Confluence", "Zephyr Scale"],
  },
  {
    name: "Workforce Management & Integration",
    client: "Oakland Group",
    role: {
      fr: "QA Engineer → QA Lead",
      en: "QA Engineer → QA Lead",
      sr: "QA inženjer → QA Lead",
    },
    description: {
      fr: "Plateforme de gestion et d'intégration des effectifs reliant les systèmes de Randstad, les plateformes de planification clientes et les applications destinées aux travailleurs.",
      en: "Workforce management and integration platform connecting Randstad systems, client planning platforms and worker-facing applications.",
      sr: "Platforma za upravljanje radnom snagom i integraciju koja povezuje Randstad sisteme, klijentske platforme za planiranje i aplikacije za radnike.",
    },
    environment: ["Postman", "REST APIs", "SQL", "DBeaver", "Grafana", "RabbitMQ", "Planday", "Osmose"],
  },
  {
    name: "Local Domain Services / LDS Digital Hub",
    client: "Oakland Group",
    role: {
      fr: "QA Lead",
      en: "QA Lead",
      sr: "QA Lead",
    },
    description: {
      fr: "Plateforme d'intégration d'entreprise conçue pour normaliser et exposer les données métier entre les systèmes locaux de Randstad France et des plateformes externes via des API et des intégrations événementielles.",
      en: "Enterprise integration platform designed to standardize and expose business data between Randstad France's local systems and external platforms through APIs and event-driven integrations.",
      sr: "Enterprise integraciona platforma dizajnirana da standardizuje i izloži poslovne podatke između lokalnih sistema Randstad France i eksternih platformi kroz API-je i event-driven integracije.",
    },
    environment: ["REST APIs", "Postman", "SQL", "Redis", "RabbitMQ", "Logs applicatifs"],
  },
  {
    name: "Stalks",
    client: "Oakland Group",
    role: {
      fr: "QA Engineer",
      en: "QA Engineer",
      sr: "QA inženjer",
    },
    description: {
      fr: "Plateforme en production de validation, d'enrichissement et de synchronisation des données de contact des alumni avec des CRM externes, utilisée par l'enseignement supérieur et les associations d'anciens élèves.",
      en: "Production platform for validating, enriching and synchronizing alumni contact data with external CRM systems, used by higher education and alumni organizations.",
      sr: "Produkciona platforma za validaciju, obogaćivanje i sinhronizaciju kontakt podataka alumni-ja sa eksternim CRM sistemima, koju koriste visokoškolstvo i alumni organizacije.",
    },
    environment: ["Web UI", "Back Office", "Jira", "Confluence", "Zephyr Scale"],
  },
  {
    name: "Keeper in Motion (KIM)",
    client: "Oakland Group",
    role: {
      fr: "QA Engineer",
      en: "QA Engineer",
      sr: "QA inženjer",
    },
    description: {
      fr: "Plateforme d'analyse de performance et de coaching pour gardiens de but, entraîneurs, clubs et académies : enregistrement de matchs, statistiques, coaching et administration.",
      en: "Performance analytics and coaching platform for football goalkeepers, coaches, clubs and academies: match recording, statistics, coaching and administration.",
      sr: "Platforma za analizu performansi i trening za golmane, trenere, klubove i akademije: snimanje utakmica, statistika, treniranje i administracija.",
    },
    environment: ["Desktop", "Tablet", "Web UI", "Back Office", "Jira", "Confluence"],
  },
];