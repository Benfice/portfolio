import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR" });

const openButton = (page: import("@playwright/test").Page) =>
  page.getByRole("button", { name: /Ouvrir la photo/ });

const captionOf = (page: import("@playwright/test").Page, index: number) =>
  page.locator("figure").nth(index).locator("figcaption span").first();

test("photography page lists albums and photos", async ({ page }) => {
  await page.goto("/fr/photography");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("images");
  await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
  expect(await page.locator("figure").count()).toBeGreaterThanOrEqual(1);
  await expect(openButton(page).first()).toBeVisible();
});

test("lightbox opens, navigates and closes", async ({ page }) => {
  await page.goto("/fr/photography");

  const photoCount = await page.locator("figure").count();
  test.skip(photoCount === 0, "no photos in the dataset");

  const firstCaption = await captionOf(page, 0).innerText();
  const trigger = openButton(page).first();

  await trigger.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(firstCaption);

  if (photoCount >= 2) {
    const secondCaption = await captionOf(page, 1).innerText();

    await dialog.getByRole("button", { name: "Photo suivante" }).click();
    await expect(dialog).toContainText(secondCaption);

    await dialog.getByRole("button", { name: "Photo précédente" }).click();
    await expect(dialog).toContainText(firstCaption);

    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText(secondCaption);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("photography lightbox has no detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/fr/photography");

  test.skip((await page.locator("figure").count()) === 0, "no photos");

  await openButton(page).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
