import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR" });

test("QA page exposes localized metadata", async ({ page }) => {
  await page.goto("/fr/qa");

  await expect(page).toHaveTitle(/Profil QA Lead/);
  await expect(page).toHaveTitle(/Benoît Freulon/);
});

test("pages expose hreflang alternates", async ({ page }) => {
  await page.goto("/en/qa");

  const frenchAlternate = page.locator(
    'link[rel="alternate"][hreflang="fr"]',
  );
  await expect(frenchAlternate).toHaveAttribute("href", /\/fr\/qa$/);
});

test("unknown page shows the localized 404", async ({ page }) => {
  const response = await page.goto("/fr/cette-page-nexiste-pas");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page introuvable",
  );
});

test("sitemap and robots are available", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("/fr/qa");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap:");
});

test("pages expose canonical and social metadata", async ({ page }) => {
  await page.goto("/fr/qa");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/fr\/qa$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /Benoît Freulon/,
  );
});

test("pages expose JSON-LD structured data", async ({ page }) => {
  await page.goto("/fr");

  const jsonLd = page.locator('script[type="application/ld+json"]');
  await expect(jsonLd).toHaveCount(1);
  const content = await jsonLd.textContent();
  expect(content).toContain('"@type":"Person"');
  expect(content).toContain('"@type":"WebSite"');
});

