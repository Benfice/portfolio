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
  await expect(page.locator("figure")).toHaveCount(9);
});
