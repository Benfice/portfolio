import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, locale: "fr-FR" });

const toggleLocator = 'button[aria-controls="mobile-menu"]';

test("mobile menu opens and closes with Escape", async ({ page }) => {
  await page.goto("/fr");

  const toggle = page.locator(toggleLocator);
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  const menu = page.getByRole("navigation", { name: "Menu principal" });
  await expect(menu).toBeHidden();

  await toggle.click();
  await expect(menu).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
});

test("mobile menu link navigates to the page", async ({ page }) => {
  await page.goto("/fr");

  await page.locator(toggleLocator).click();
  const menu = page.getByRole("navigation", { name: "Menu principal" });
  await menu.getByRole("link", { name: "QA" }).click();

  await expect(page).toHaveURL(/\/fr\/qa$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
