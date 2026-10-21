import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ],
  webServer: { command: 'npm run dev -- --port 4173 --strictPort', port: 4173, reuseExistingServer: !process.env.CI, timeout: 60000 },
  reporter: [['list'], ['html', { open: 'never' }]]
});
