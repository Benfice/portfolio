import { expect, test } from "@playwright/test";

test("toggles the color theme and persists the choice", async ({ page }) => {
  await page.goto("/fr");

  const html = page.locator("html");
  const hadDark = await html.evaluate((el) => el.classList.contains("dark"));

  await page.getByRole("button", { name: /thème/i }).click();

  await expect
    .poll(() => html.evaluate((el) => el.classList.contains("dark")))
    .toBe(!hadDark);

  const stored = await page.evaluate(() => localStorage.getItem("theme"));
  expect(stored).toBe(hadDark ? "light" : "dark");

  await page.reload();

  await expect
    .poll(() => html.evaluate((el) => el.classList.contains("dark")))
    .toBe(!hadDark);
});
