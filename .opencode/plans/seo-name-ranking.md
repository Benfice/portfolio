# Plan — SEO : sortir en premier sur « Benoît/Benoit Freulon Photographie (Novi Sad) »

Objectif : renforcer le SEO technique, éditorial et structuré pour que le site
remonte sur les requêtes de nom propre « Benoit Freulon Photographie » et
« Benoit Freulon Novi Sad ». Domaine de production retenu :
`https://benoitfreulon.vercel.app`.

Décisions actées avec l'utilisateur :
- Domaine : `benoitfreulon.vercel.app` (pas de domaine custom pour l'instant).
- Pas d'accès Google Search Console / Bing (à créer, guidage pas à pas).
- L'utilisateur optimisera ses profils hors-site (LinkedIn, GBP, etc.).
- On conserve les H1 poétiques, on optimise uniquement les balises `<title>` / meta.

---

## Phase 1 — Correctif bloquant : canonical / URL (code + env)

Constat : `canonical`, `hreflang`, `og:image` et `sitemap.xml` pointent vers
l'URL de déploiement éphémère `https://portfolio-6f…vercel.app` (via `VERCEL_URL`),
qui change à chaque déploiement → mauvaise indexation.

- `src/lib/site.ts` : `getBaseUrl()` → ordre de priorité
  1. `NEXT_PUBLIC_SITE_URL` (normalisée sans slash final)
  2. `VERCEL_PROJECT_PRODUCTION_URL` (domaine stable du projet)
  3. `VERCEL_URL`
  4. `http://localhost:3000`
- `.env.example` : mettre à jour le commentaire et la valeur d'exemple
  `NEXT_PUBLIC_SITE_URL=https://benoitfreulon.vercel.app`.
- **Action utilisateur** : Vercel → Project → Settings → Environment Variables →
  ajouter `NEXT_PUBLIC_SITE_URL=https://benoitfreulon.vercel.app` (Production +
  Preview), puis redéployer.

Vérif après déploiement : `curl` sur `/fr` → `canonical`/`hreflang`/`og:image`
= `https://benoitfreulon.vercel.app/...`, et `sitemap.xml`/`robots.txt` idem.

---

## Phase 2 — Titres & descriptions optimisés (code, H1 inchangés)

Mécanique : ajouter `metaTitle`/`metaDescription` par namespace de messages et
passer les titres en `absolute` (pour éviter le doublon « — Benoît Freulon » du
template du layout).

- `src/lib/metadata.ts` : `buildPageMetadata()` accepte `absoluteTitle?` →
  `metadata.title = { absolute: absoluteTitle }`.
- `src/messages/{fr,en,sr}.json` : valeurs ci-dessous.
- Pages : `photography`, `qa`, `knowledge`, `about`, `contact` utilisent
  `absoluteTitle: t("metaTitle")` + `description: t("metaDescription")`.
- Accueil : `Metadata.title`/`description` (utilisés par le layout).

### Table des titres (`<title>`)

| Page | FR | EN | SR |
| --- | --- | --- | --- |
| Accueil (Metadata) | Benoît Freulon — Photographe & QA Lead à Novi Sad | Benoît Freulon — Photographer & QA Lead in Novi Sad | Benoît Freulon — fotograf i QA Lead u Novom Sadu |
| Photographie | Photographie — Benoît Freulon (Novi Sad) | Photography — Benoît Freulon (Novi Sad) | Fotografija — Benoît Freulon (Novi Sad) |
| QA | Profil QA Lead — Benoît Freulon (Novi Sad) | QA Lead profile — Benoît Freulon (Novi Sad) | QA Lead profil — Benoît Freulon (Novi Sad) |
| Base de connaissances | Base de connaissances — Benoît Freulon | Knowledge base — Benoît Freulon | Mapa znanja — Benoît Freulon |
| À propos | À propos de Benoît Freulon — Photographe & QA Lead à Novi Sad | About Benoît Freulon — Photographer & QA Lead in Novi Sad | O Benoît Freulon — fotograf i QA Lead u Novom Sadu |
| Contact | Contact — Benoît Freulon | Contact — Benoît Freulon | Kontakt — Benoît Freulon |

Descriptions (résumé) :
- Accueil FR : « Portfolio de Benoît Freulon : photographie à Novi Sad, profil
  QA Lead et base de connaissances en qualité logicielle. » (+ EN/SR équivalents)
- Photographie FR : « Galerie photographique de Benoît Freulon : séries
  personnelles à Novi Sad et ailleurs — voyage, architecture, portraits et
  scènes du quotidien. » (+ EN/SR)
- QA / Knowledge / Contact : descriptions riches en mots-clés (nom, QA, Novi Sad).
- À propos : description dynamique = intro Sanity (conservée).

Nom sans accent : ajout `alternateName: "Benoit Freulon"` dans le JSON-LD Person
(voir phase 3).

---

## Phase 3 — Données structurées (code)

Nouveau module `src/lib/structured-data.ts` :
- `buildHomeGraph({ base, locale, profile })` → `@graph` [Person, WebSite].
  Enrichir **Person** : `alternateName: "Benoit Freulon"`, `image`
  (`${base}/${locale}/opengraph-image`), `knowsLanguage: ["fr","en","sr"]`,
  `address` avec `addressLocality: "Novi Sad"` + `addressCountry: "RS"`,
  `knowsAbout: ["Software quality assurance","Test automation","Photography"]`,
  `sameAs` (socials), `jobTitle`, `email`, `url`.
- `buildBreadcrumbs({ base, locale, trail })` → `BreadcrumbList`.
- `buildImageGallery({ base, locale, albums, pageUrl, pageName })` →
  `ImageGallery` + `ImageObject[]` (contentUrl = `photo.src`, name/caption
  localisés, `contentLocation` = lieu).

Intégration :
- `src/app/[locale]/layout.tsx` : remplacer le JSON-LD inline par
  `buildHomeGraph`, ajouter `verification` (voir phase 4).
- Pages `photography`, `qa`, `knowledge`, `about`, `contact` : rendre
  `<JsonLd data={buildBreadcrumbs(...)} />` (helper réutilisant les libellés
  de nav/messages).
- `photography` : rendre aussi `<JsonLd data={buildImageGallery(...)} />` à partir
  de `getAlbums()` (les `src` sont déjà fournis par `getPhotoUrl`).

---

## Phase 4 — Indexation & mesure (code + utilisateur)

- `src/app/[locale]/layout.tsx` : `verification` conditionnelle lue depuis
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` et `NEXT_PUBLIC_BING_SITE_VERIFICATION`
  (balises `<meta name="google-site-verification">` / `msvalidate.01`).
- `.env.example` : documenter ces deux variables.
- `src/app/robots.ts` : ajouter `disallow: ["/api/"]` (le Studio reste `noindex`
  via les métadonnées next-sanity).
- **Action utilisateur (guidage)** :
  1. Google Search Console → propriété « Préfixe d'URL »
     `https://benoitfreulon.vercel.app` → récupérer le jeton de vérification.
  2. Le fournir → on le met dans `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
  3. Soumettre `https://benoitfreulon.vercel.app/sitemap.xml`.
  4. Bing Webmaster Tools → import depuis GSC (jeton `msvalidate.01` si besoin).
  5. Demander l'indexation des 6 pages (FR + EN/SR).
- Suivi : onglet « Performances » de GSC (requêtes, positions).

---

## Phase 5 — Checklist hors-site (README, action utilisateur)

Section « SEO » dans `README.md` :
- **Google Business Profile** « Photographe, Novi Sad » (nom, catégorie,
  adresse/zone, site, photos).
- **LinkedIn** : titre contenant « Photographe » + champ « Site web » → URL du
  site ; GitHub : README de profil + champ site ; Instagram/Behance/500px :
  bio avec lien vers le site.
- **Cohérence** du nom (Benoît / Benoit) et de la localisation « Novi Sad » sur
  tous les profils (= NAP/entité consistante pour Google).
- **Backlinks/mentions** : annuaires photo, portfolios, interviews, partages.
- Ajouter les nouveaux liens dans `profile.socials` (Sanity) pour alimenter
  `sameAs`.

---

## Phase 6 (optionnelle, non incluse) — Contenu localisé

Créer un bloc de texte visible « Photographie à Novi Sad » sur la page
Photographie (recherche locale + pertinence mot-clé). À valider séparément
(impact éditorial).

---

## Fichiers touchés

- `src/lib/site.ts` (phase 1)
- `src/lib/metadata.ts`, `src/messages/{fr,en,sr}.json`,
  `src/app/[locale]/{,photography,qa,knowledge,about,contact}/page.tsx` (phase 2)
- `src/lib/structured-data.ts` (nouveau), `src/app/[locale]/layout.tsx`,
  pages sous-jacentes (phase 3)
- `src/app/robots.ts`, `.env.example` (phase 4)
- `README.md` (phase 5)
- Tests : `tests/e2e/meta.spec.ts` (adapter l'assertion du titre QA),
  `tests/unit/metadata.test.ts` (couvrir `absoluteTitle`).

## Vérifications

- `npm run lint`, `npx tsc --noEmit`, `npx vitest run`, `npx playwright test`.
- Après déploiement : `curl` canonical/hreflang/sitemap/robots ; validation du
  JSON-LD (test Rich Results de Google) ; PageSpeed.
