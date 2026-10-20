import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR" });

test("knowledge page lists themes and concepts", async ({ page }) => {
  await page.goto("/fr/knowledge");

  await expect(
    page.getByRole("heading", { name: "Qualité & tests" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Stratégie de test" }),
  ).toBeVisible();
});

test("journey page shows timeline or empty state", async ({ page }) => {
  await page.goto("/fr/journey");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
});

test("contact page exposes email and social links", async ({ page }) => {
  await page.goto("/fr/contact");

  const main = page.getByRole("main");

  await expect(
    main.getByRole("link", { name: "benfice@proton.me" }).first(),
  ).toHaveAttribute("href", "mailto:benfice@proton.me");
  await expect(
    main.getByRole("link", { name: "GitHub" }),
  ).toBeVisible();
});
