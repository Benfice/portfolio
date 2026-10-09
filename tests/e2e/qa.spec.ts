import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR" });

test("QA page shows the full CV: experience, skills, projects and education", async ({
  page,
}) => {
  await page.goto("/fr/qa");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "qualité",
  );
  await expect(
    page.getByRole("heading", { name: "Expérience", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Compétences", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Projets", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("PLASSIDO")).toBeVisible();
  await expect(page.getByText("SYNECHRON")).toBeVisible();
  await expect(page.getByText("Bulldozer")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Formation", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Certifications & formation continue",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Langues", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("OpenClassrooms")).toBeVisible();
});