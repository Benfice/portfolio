# Benoît Freulon — Portfolio

Site personnel trilingue (fr / en / sr) réunissant photographie, profil QA et
base de connaissances.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com) (configuration en CSS)
- [next-intl](https://next-intl.dev) — multilingue (fr / en / sr)
- [Sanity](https://www.sanity.io) — gestion des contenus (à venir, étape 2)
- [Playwright](https://playwright.dev) + [Vitest](https://vitest.dev) — tests
- CI GitHub Actions

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) → redirige vers `/fr`.

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

## Structure

```
src/
  app/[locale]/        # pages par langue (fr, en, sr) + 404 localisé
  app/                 # sitemap.ts, robots.ts
  components/          # Header, Footer, MobileNav, PageHeader, PhotoPlaceholder…
  components/ui/       # primitives (Container, Section, Button, Card…)
  content/             # contenus typés (profil, expérience, compétences, projets,
                       # formation, certifications, langues, photos, connaissances)
  i18n/                # routing + configuration next-intl
  messages/            # chaînes d'interface (fr.json, en.json, sr.json)
  lib/                 # utilitaires (cn, localized, metadata, site, slugify)
tests/
  unit/                # tests Vitest
  e2e/                 # tests Playwright (desktop + mobile + tablette)
```

## Contenus

Tout le contenu éditorial vit dans `src/content/` sous forme d'objets typés
localisés (`{ fr, en, sr }`). Pour modifier le profil, l'expérience, les
compétences, les projets, les albums photo ou la base de connaissances, il
suffit d'éditer ces fichiers — aucun code de page à toucher.

Les textes d'interface (navigation, titres de section, boutons…) sont dans
`src/messages/{fr,en,sr}.json`.

Les visuels photo sont pour l'instant des placeholders SVG générés
(`PhotoPlaceholder`) ; les vraies images et la lightbox arriveront à l'étape 2.

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

## Déploiement

Prévu sur [Vercel](https://vercel.com). Définir `NEXT_PUBLIC_SITE_URL` avec
l'URL publique du site pour les métadonnées et le sitemap.

## Feuille de route

- **Étape 1** — design system, pages et contenus locaux (fait)
- **Étape 2** — CV réel intégré sur la page QA (fait) : expérience, compétences,
  projets Plassido, formation, certifications, langues
- **Étape 3** — Sanity (CMS), vraies photos, lightbox, carte de connaissances
  interactive
