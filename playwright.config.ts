import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    locale: 'fr',
  },
  webServer: {
    command: 'yarn dev --hostname 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000/fr',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
