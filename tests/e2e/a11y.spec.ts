import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/fr",
  "/fr/photography",
  "/fr/qa",
  "/fr/knowledge",
  "/fr/about",
  "/fr/contact",
];

for (const route of routes) {
  test(`${route} has no detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
}
