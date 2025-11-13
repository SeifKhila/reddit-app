// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Only look for tests in e2e folder
  testDir: './e2e',

  // Only run files that end with .spec.js
  testMatch: /.*\.spec\.js/,

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },

  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: true,
  },
});


