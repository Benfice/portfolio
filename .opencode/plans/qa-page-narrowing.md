# Plan — Réordonner les onglets et recentrer la page QA

Décisions utilisateur :
- Onglet **QA avant Photographie**.
- Renommer le **titre de section** « Expérience professionnelle » → « Expérience
  professionnelle QA » (le H1 de page reste inchangé).
- Ne garder sur la page QA que les **2 expériences QA** (PLASSIDO, SYNECHRON) ;
  les autres restent dans le code/les données.
- Retirer la section **Parcours académique** (education) de la page QA.
- Conserver Compétences, Projets, Certifications (+ formations OpenClassrooms/Udemy),
  Langues.
- Filtrage par **liste d'entreprises QA dans le code** (pas de changement de
  schéma ni de dataset).

## Données (constat)
Dataset Sanity live : 7 expériences.
- QA : `PLASSIDO` (experience-0), `SYNECHRON` (experience-2).
- Non-QA : `MEDIA PRESS` (experience-1) + 4 plus anciennes.
Conservation : `src/content/experience.ts` (liste statique complète) et le
dataset Sanity restent intacts ; seule la page QA filtre.

## Changements

### 1. Ordre des onglets — `src/lib/nav.ts`
Inverser les entrées `photography` et `qa` :
`home, qa, photography, knowledge, about, contact`.

### 2. Titres de section — `src/messages/{fr,en,sr}.json`
- fr : `Qa.experienceTitle` → « Expérience professionnelle QA »
- en : → « QA professional experience »
- sr : → « Profesionalno QA iskustvo »
(Le H1 `Qa.title` et les autres libellés sont inchangés.)

### 3. Page QA — `src/app/[locale]/qa/page.tsx`
- Ajouter une constante de filtrage explicite :
  `const QA_EXPERIENCES = ["PLASSIDO", "SYNECHRON"];`
  puis `const qaExperience = experience.filter((item) => QA_EXPERIENCES.includes(item.company));`
  et rendre `qaExperience` (au lieu de `experience`).
- Retirer la section « Parcours académique » : supprimer l'import `getEducation`,
  l'appel dans `Promise.all` (et la variable destructurée) et le bloc `<Section>`
  correspondant.
- Conserver les autres sections et le code de rendu de la timeline (le sous-titre
  « expériences antérieures » reste présent dans le code, simplement inactif).

### 4. Tests — `tests/e2e/qa.spec.ts`
Ajouter des assertions :
- la page QA affiche `PLASSIDO` et `SYNECHRON` ;
- elle n'affiche plus `MEDIA PRESS` ni « Parcours académique ».
(Les tests existants — bouton CV, styles d'impression — restent valides.)

## Vérifications
`npm run lint`, `npx tsc --noEmit`, `npx vitest run`, `npx playwright test`.
