import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR" });

test("shows a print CV button on QA page", async ({ page }) => {
  await page.goto("/fr/qa");

  const printButton = page.getByRole("button", { name: /Imprimer le CV/i });
  await expect(printButton).toBeVisible();
});

test("QA page only lists QA experiences", async ({ page }) => {
  await page.goto("/fr/qa");

  await expect(
    page.getByRole("heading", { name: /PLASSIDO/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /SYNECHRON/ }),
  ).toBeVisible();
  await expect(page.getByText("MEDIA PRESS")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: /Parcours académique/ }),
  ).toHaveCount(0);
});

test("print styles hide non-essential elements", async ({ page }) => {
  await page.goto("/fr/qa");
  await page.emulateMedia({ media: "print" });

  const printButton = page.getByRole("button", { name: /Imprimer le CV/i });
  await expect(printButton).toBeHidden();
});
