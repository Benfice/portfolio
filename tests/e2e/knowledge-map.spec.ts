import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR" });

test("knowledge map renders nodes and highlights on hover", async ({
  page,
}) => {
  await page.goto("/fr/knowledge");

  const map = page.getByRole("group", { name: "Carte des connaissances" });
  await expect(
    map.getByRole("button", { name: "Qualité & tests" }),
  ).toBeVisible();
  await expect(
    map.getByRole("button", { name: "Stratégie de test" }),
  ).toBeVisible();

  await map.getByRole("button", { name: "API", exact: true }).hover();
  await expect(
    map.getByRole("button", { name: "Tests de contrat" }),
  ).toHaveClass(/opacity-100/);
  await expect(
    map.getByRole("button", { name: "Shift-left" }),
  ).toHaveClass(/opacity-25/);
});

test("knowledge map opens a concept detail and resets", async ({ page }) => {
  await page.goto("/fr/knowledge");

  const map = page.getByRole("group", { name: "Carte des connaissances" });

  await map.getByRole("button", { name: "Shift-left" }).click();
  const detail = page.getByRole("region", { name: /Shift-left/ });
  await expect(detail).toContainText(
    "Intégrer la qualité le plus tôt possible dans le cycle.",
  );
  await expect(
    detail.getByRole("button", { name: "Observabilité" }),
  ).toBeVisible();

  await detail.getByRole("button", { name: "Collaboration" }).click();
  await expect(page.getByRole("region", { name: /Collaboration/ })).toBeVisible();

  await page.getByRole("button", { name: "Réinitialiser la sélection" }).click();
  await expect(page.getByRole("region")).toHaveCount(0);
  await expect(page.getByText(/Parcourez la carte au clavier/)).toBeVisible();
});

test("knowledge map is operable with the keyboard", async ({ page }) => {
  await page.goto("/fr/knowledge");

  const map = page.getByRole("group", { name: "Carte des connaissances" });
  await map.getByRole("button", { name: "Stratégie de test" }).focus();
  await page.keyboard.press("Enter");

  await expect(page.getByRole("region", { name: /Stratégie de test/ })).toBeVisible();
});

test("knowledge map has no detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/fr/knowledge");

  await page
    .getByRole("group", { name: "Carte des connaissances" })
    .getByRole("button", { name: "Shift-left" })
    .click();

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});