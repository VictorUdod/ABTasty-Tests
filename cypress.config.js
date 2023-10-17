const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1800,
  viewportHeight: 1000,
  defaultCommandTimeout: 80000,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://app2.abtasty.com/login',
    testIsolation: true
  },

  env: {
    validEmail: 'validemail@example.com',
    validPassword: 'validpassword',
    invalidEmail: 'invalidemail@examle.com',
    invalidPassword: 'invalidpassword',
    invalidEmails: [
      'invalidemail',
      'invalidemail@',
      'invalidemail@example',
      'invalidemail@example.',
      '@invalidemail.com',
      '@invalidemail@example.com',
      'invalidemail@example@com',
      'invalidemail@.com',
      'invalidemail@example..com',
      'inavlidemail@example.123',
    ],
    ssoEmail: 'sso-user@example.com'
  }
});
