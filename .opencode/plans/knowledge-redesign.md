# Plan — Redesign multilingual Knowledge section

## Current state
- Schema: `knowledgeTheme` with embedded `concepts` (id, localized title/summary, tags), ordered by `order`. Seeded in Sanity/snapshot (3 themes). 
- Page: single `/[locale]/knowledge` renders interactive map + theme sections with concept cards. 
- Data layer: `getKnowledgeThemes()`, `mapKnowledgeTheme()`. CONTENT_TYPES includes `knowledgeTheme`.
- Routes: only overview exists. No domain/item detail routes.

## Goal
3-level IA: (1) overview with domains (initial 5: Quality Assurance, Development, Project Management, Photography, Learning & Methods) as cards, (2) domain pages grouping items by category/subdomain, (3) knowledge item detail pages with definition/explanation/example/practical application, related knowledge (bounded, no recursion), related projects/experiences, tools, external resources. Manageable via Sanity. Localized fr/en/sr. No fabricated content.

## 1) Schemas (Sanity)
Create:
- `sanity/schemas/domain.ts`: title (internationalizedArrayString, required), shortDescription/description (internationalizedArrayText), order, image, imageAlt (internationalizedArrayText), relatedDomains (array of refs to domain)
- `sanity/schemas/knowledgeItem.ts`: title (required, internationalizedArrayString), shortDescription/definition/explanation/example/practicalApplication (internationalizedArrayText optional), domain (ref to domain required), domains (array of refs optional), category/subdomain (internationalizedArrayString optional), status (select optional: practiced_professionally|practiced_personal|learning|theoretical), order, image/imageAlt, relatedKnowledge (array of refs to knowledgeItem), relatedProjects (array of refs to project), relatedExperiences (array of refs to experience), relatedTools (array of strings), externalResources (array of {label internationalizedArrayString, href url, internal bool})

Register in `sanity/schemas/index.ts`. Add `domain`, `knowledgeItem` to `CONTENT_TYPES` in `src/lib/sanity/client.ts`. Keep `knowledgeTheme` for backward compat (don't break existing).

## 2) Types/mappers/getters
- Extend `src/content/knowledge.ts` with Domain, KnowledgeItem, KnowledgeStatus types
- Mappers: `mapDomain()`, `mapKnowledgeItem()` in `src/lib/sanity/mappers.ts`
- Getters: `getDomains()`, `getDomainBySlugOrId()`, `getKnowledgeItems()`, `getKnowledgeItemById()`, `getKnowledgeItemsByDomain()` in `src/lib/sanity/content.ts` (filter published, respect order)

## 3) Routing/pages
- Redesign `src/app/[locale]/knowledge/page.tsx` as overview: domains as cards + intro (localized). Keep map optional or adapt.
- Add `src/app/[locale]/knowledge/[domainSlug]/page.tsx` (domain detail)
- Add `src/app/[locale]/knowledge/[domainSlug]/[itemSlug]/page.tsx` (item detail). Slugs derived from title/localized or use stable refs; follow existing patterns.
- Handle missing/unpublished with not-found.

## 4) Translations/UI
Update `src/messages/{fr,en,sr}.json` Knowledge namespace with overview/domain/item labels, status labels, empty states. Use Latin Serbian.

## 5) Relationships & safety
Bounded lists for relatedKnowledge (no deep recursion/cycles expansion). Only show published refs. Graceful fallbacks for missing translations.

## 6) Tests/validation
Update/add e2e tests, run lint/tsc/unit/e2e.

Implementation in Build mode after approval.
