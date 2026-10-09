import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR" });

test("QA page shows experience, skills and projects", async ({ page }) => {
  await page.goto("/fr/qa");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "qualité",
  );
  await expect(
    page.getByRole("heading", { name: "Expérience" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Compétences" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Projets" })).toBeVisible();
  await expect(page.getByText("Studio Lumière")).toBeVisible();
});
