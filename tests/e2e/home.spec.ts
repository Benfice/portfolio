import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR" });

test("redirects the root URL to the default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/fr$/);
});

const locales = ["fr", "en", "sr"] as const;

for (const locale of locales) {
  test(`home page renders in "${locale}"`, async ({ page }) => {
    const response = await page.goto(`/${locale}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("switches language while staying on the same page", async ({ page }) => {
  await page.goto("/fr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("fiables");

  await page.getByRole("combobox").selectOption("en");

  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("reliable");
});
