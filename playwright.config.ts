import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium-mobile",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "chromium-tablet",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 834, height: 1112 },
      },
    },
  ],
  webServer: {
    // Production server: a "next dev" instance cannot coexist (Next 16 locks
    // the project directory), so E2E runs against a production build.
    command: process.env.CI
      ? `npm run start -- -p ${PORT}`
      : `npm run build && npm run start -- -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
