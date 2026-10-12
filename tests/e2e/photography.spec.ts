import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR" });

test("photography page lists albums and photos", async ({ page }) => {
  await page.goto("/fr/photography");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("images");
  await expect(
    page.getByRole("heading", { name: "Lumière urbaine" }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /Rue en pente/ }),
  ).toBeVisible();
  expect(await page.locator("figure").count()).toBeGreaterThanOrEqual(9);
});

test("lightbox opens, navigates and closes", async ({ page }) => {
  await page.goto("/fr/photography");

  await page
    .getByRole("button", { name: /Ouvrir la photo « Rue en pente »/ })
    .click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Paris, 2024");

  await dialog.getByRole("button", { name: "Photo suivante" }).click();
  await expect(dialog).toContainText("Reflets");

  await dialog.getByRole("button", { name: "Photo précédente" }).click();
  await expect(dialog).toContainText("Rue en pente");

  await page.keyboard.press("ArrowRight");
  await expect(dialog).toContainText("Reflets");

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /Ouvrir la photo « Rue en pente »/ }),
  ).toBeFocused();
});

test("photography lightbox has no detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/fr/photography");

  await page
    .getByRole("button", { name: /Ouvrir la photo « Rue en pente »/ })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});