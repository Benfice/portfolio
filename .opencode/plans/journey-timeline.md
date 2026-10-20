# Plan: Replace "About" with "Journey" timeline

## Overview
Replace the "À propos" (About) page with a new multilingual "Parcours/Journey/Životni put" page that displays a chronological timeline of events managed in Sanity. Old `/about` URLs redirect to `/journey`. No fabricated content; empty state if no events exist.

## 1) Sanity schema - journeyEvent
Create `sanity/schemas/journeyEvent.ts`:
- year: number, required, validation min 1900 max 2100
- month: number, optional, validation min 1 max 12
- title: internationalizedArrayString (required)
- description: internationalizedArrayText (optional)
- image: image (optional)
- imageAlt: internationalizedArrayText (optional)
- category: select (optional) with values: personal, education, professional, photography, projects, learning (store slug values)
- relatedLinks: array of { label (internationalizedArrayString), href (string/url), internal (boolean) }
- order: number (optional, default 0) for intra-year tie-breaking

Register in `sanity/schemas/index.ts`.

## 2) Types, mappers, data layer
- `src/content/journey.ts`: JourneyEvent type, JourneyCategory union, category label mapping helper or just use i18n
- `src/lib/sanity/mappers.ts`: `mapJourneyEvent()` handling localized fields, image, links, numbers
- `src/lib/sanity/content.ts`: `getJourneyEvents()` returning events sorted by year desc, month desc (nulls as 0), order desc

## 3) UI - Journey page
Create `src/app/[locale]/journey/page.tsx`:
- generateMetadata via buildPageMetadata (Journey namespace metaTitle/description)
- breadcrumbs include Journey (Nav.journey)
- PageHeader with Journey title/lead/eyebrow
- Timeline: group by year desc, within year events by month desc, order desc; show month names per locale (Intl.DateTimeFormat), year markers, vertical line, optional image/description/category/links
- Localized empty state when no events

## 4) Navigation & translations
- `src/lib/nav.ts`: replace about with `{ href: "/journey", key: "journey" }`
- `src/messages/{fr,en,sr}.json`: Nav.journey = "Parcours"/"Journey"/"Životni put"; add Journey namespace (eyebrow/title/lead/metaTitle/metaDescription/emptyState + month names + categories)

## 5) Redirects & routing
- Replace `src/app/[locale]/about/page.tsx` to redirect to `/journey` using next-intl `redirect({ href: '/journey', locale })` (permanent)
- `src/app/sitemap.ts`: replace `/about` with `/journey`

## 6) Tests
- Update `tests/e2e/pages.spec.ts`: journey test (loads, shows timeline or empty state)
- Update `tests/e2e/a11y.spec.ts`: `/fr/journey`
- Verify nav behavior; run all tests

## 7) Validation
lint, typecheck, unit, e2e. All must pass. No invented data.