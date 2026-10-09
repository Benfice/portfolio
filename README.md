# Benfice — Portfolio

Site personnel réunissant photographie, profil QA et base de connaissances.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [next-intl](https://next-intl.dev) — multilingue (fr / en / sr)
- [Sanity](https://www.sanity.io) — gestion des contenus (à venir)
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
  app/[locale]/        # pages par langue (fr, en, sr)
  components/          # Header, Footer, ThemeToggle, LanguageSwitcher
  i18n/                # routing + configuration next-intl
  messages/            # chaînes d'interface (fr.json, en.json, sr.json)
  lib/                 # utilitaires
tests/
  unit/                # tests Vitest
  e2e/                 # tests Playwright
```
