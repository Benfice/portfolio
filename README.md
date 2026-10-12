# Benoît Freulon — Portfolio

Site personnel trilingue (fr / en / sr) réunissant photographie, profil QA et
base de connaissances.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com) (configuration en CSS)
- [next-intl](https://next-intl.dev) — multilingue (fr / en / sr)
- [Sanity](https://www.sanity.io) — CMS headless + Studio embarqué
- [Playwright](https://playwright.dev) + [Vitest](https://vitest.dev) — tests
- CI GitHub Actions

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) → redirige vers `/fr`.

Aucune variable d'environnement n'est requise : sans configuration Sanity, le
site lit le contenu du **snapshot committé** (`sanity/snapshot.json`) et
fonctionne donc hors ligne. Voir la section [Contenus](#contenus) pour brancher
le CMS.

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build de production |
| `npm run lint` | Analyse ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm test` | Tests unitaires (Vitest) |
| `npm run test:e2e` | Tests end-to-end (Playwright) |
| `npm run seed:sanity` | Régénère le snapshot et (si configuré) synchronise le dataset |

## Structure

```
src/
  app/[locale]/        # pages par langue (fr, en, sr) + 404 localisé
  app/studio/          # Studio Sanity embarqué sur /studio
  app/                 # sitemap.ts, robots.ts
  components/          # Header, Footer, MobileNav, PageHeader, PhotoGallery,
                       # KnowledgeMap, Studio…
  components/ui/       # primitives (Container, Section, Button, Card…)
  content/             # contenus typés (source du seed Sanity)
  i18n/                # routing + configuration next-intl
  lib/sanity/          # couche de données (client, getters, mappers, images)
  messages/            # chaînes d'interface (fr.json, en.json, sr.json)
  lib/                 # utilitaires (cn, localized, metadata, site, slugify)
sanity/
  schemas/             # 11 schémas de documents (internationalisés fr/en/sr)
  snapshot.json        # contenu committé, utilisé comme repli hors ligne
scripts/
  seed-sanity.ts       # génère le snapshot depuis src/content/
tests/
  unit/                # tests Vitest
  e2e/                 # tests Playwright (desktop + mobile + tablette)
```

## Contenus

Le contenu éditorial est décrit une fois dans `src/content/` sous forme d'objets
typés localisés (`{ fr, en, sr }`). Cette source sert à générer :

1. le **snapshot** `sanity/snapshot.json` (repli hors ligne, committé), et
2. le **dataset Sanity** (si un projet est configuré).

```bash
npm run seed:sanity
```

Le script écrit toujours le snapshot ; il ne synchronise le dataset que si
`NEXT_PUBLIC_SANITY_PROJECT_ID` **et** `SANITY_API_WRITE_TOKEN` sont définis.

### Brancher Sanity

1. Créer un projet sur [sanity.io/manage](https://www.sanity.io/manage) (ou
   `npx sanity init`) et noter l'`projectId` / le `dataset`.
2. Copier `.env.example` vers `.env.local` et renseigner les variables.
3. Ouvrir le Studio embarqué sur **`/studio`** pour éditer le contenu.
4. `npm run seed:sanity` pour pousser le contenu existant, puis les éditions se
   font dans le Studio.

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Identifiant du projet (active la lecture Sanity) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (défaut : `production`) |
| `SANITY_API_READ_TOKEN` | Jeton de lecture (contenu privé, optionnel) |
| `SANITY_API_WRITE_TOKEN` | Jeton d'écriture (uniquement pour `seed:sanity`) |

Sans `NEXT_PUBLIC_SANITY_PROJECT_ID`, la couche `src/lib/sanity/client.ts`
retombe automatiquement sur `sanity/snapshot.json`.

Les textes d'interface (navigation, titres de section, boutons…) sont dans
`src/messages/{fr,en,sr}.json`.

Les visuels photo utilisent pour l'instant des placeholders SVG générés
(`PhotoPlaceholder`) ; la lightbox est en place et les vraies images Sanity
(`cdn.sanity.io`) s'afficheront dès qu'elles seront ajoutées à un album.

## Thème

Les couleurs et la typographie sont définies par des tokens CSS dans
`src/app/globals.css` (parité clair/sombre). Le basculement de thème est
persisté dans `localStorage`.

## Tests

- Unitaires (Vitest) : `npm test`
- End-to-end (Playwright) : `npm run test:e2e` — lancés sur trois profils
  (desktop, mobile, tablette), incluant des contrôles d'accessibilité (axe).
  Les tests E2E tournent contre un **serveur de production** (`next build` +
  `next start`) sur un port dédié (3100) : `next dev` ne peut pas cohabiter
  avec un autre `next dev` (verrou de répertoire Next 16). Le `next dev`
  (port 3000) peut donc rester actif pendant tes E2E.

La CI (`.github/workflows/ci.yml`) installe Chromium (`playwright install
--with-deps chromium`) avant le build. La synchronisation Sanity y est
optionnelle : elle ne s'exécute que si le secret `SANITY_API_WRITE_TOKEN` est
défini.

## Formulaire de contact

La page `/contact` poste vers `src/app/api/contact/route.ts`, qui envoie le
message via [Resend](https://resend.com) (protection par honeypot, délai
minimal de 2 s et limite de 5 requêtes/minute par IP). Le lien `mailto` reste
disponible comme secours.

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé API Resend ; sans elle, la route répond `success` sans envoyer |
| `CONTACT_TO_EMAIL` | Destinataire des messages (défaut : email du propriétaire) |
| `RESEND_FROM_EMAIL` | Expéditeur (défaut : `Portfolio <onboarding@resend.dev>`) |

Tant que le compte Resend est en **mode test** (aucun domaine vérifié), l'envoi
n'est autorisé que vers l'adresse email du compte, avec l'expéditeur
`onboarding@resend.dev`. Vérifier un domaine sur Resend pour envoyer vers
n'importe quelle adresse et personnaliser `RESEND_FROM_EMAIL`.

## Déploiement

Déployé sur [Vercel](https://vercel.com). Définir `NEXT_PUBLIC_SITE_URL` avec
l'URL publique du site (métadonnées et sitemap), les variables Sanity ci-dessus
si le CMS est utilisé, et les variables Resend pour le formulaire de contact.

## Feuille de route

- **Étape 1** — design system, pages et contenus locaux (fait)
- **Étape 2** — CV réel intégré sur la page QA (fait) : expérience, compétences,
  projets Plassido, formation, certifications, langues
- **Étape 3** — Sanity (CMS) et Studio embarqué, lightbox photo, carte de
  connaissances interactive (fait) ; reste à ajouter les vraies photos
- **Étape 4** — SEO, CV imprimable et contact (fait) : URL canoniques, images
  Open Graph / Twitter générées, données structurées JSON-LD et analytics ;
  bouton d'impression du CV avec styles `@media print` ; formulaire de contact
  envoyé via Resend (honeypot, délai minimal et rate limiting)
