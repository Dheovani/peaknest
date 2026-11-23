import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e/web",
  use: { baseURL: "http://localhost:3000", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm dev:web",
    url: "http://localhost:3000/api/v1/health",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  outputDir: "tests/artifacts/playwright",
});
