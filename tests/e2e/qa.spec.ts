import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR" });

test("shows a print CV button on QA page", async ({ page }) => {
  await page.goto("/fr/qa");

  const printButton = page.getByRole("button", { name: /Imprimer le CV/i });
  await expect(printButton).toBeVisible();
});

test("print styles hide non-essential elements", async ({ page }) => {
  await page.goto("/fr/qa");
  await page.emulateMedia({ media: "print" });

  const printButton = page.getByRole("button", { name: /Imprimer le CV/i });
  await expect(printButton).toBeHidden();
});
