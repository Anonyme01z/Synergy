const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    stagingUrl: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    environment: "staging"
  },
  defaultCommandTimeout: 6000,
   pageLoadTimeout: 90000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  watchForFileChanges: false
});
