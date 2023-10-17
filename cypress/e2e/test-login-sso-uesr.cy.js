/// <reference types='cypress'/>

const { fillEmail } = require("../utils/loginFormsInput");

const ssoEmail = Cypress.env('ssoEmail');

describe('Test login SSO user', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('TC003 - Login as an SSO user.', () => {
        fillEmail(ssoEmail);
        cy.contains('You are recognized as an SSO user, use the link below').should('be.visible');
        cy.get('button').contains('Sign in with SSO').click();
        cy.url().should('include', '/ssologin');
        fillEmail(ssoEmail);
        cy.get('button[type=submit]').click();
        cy.origin('https://www.sso-platform.com', () => {
            cy.get('button', 'Log in').click();
            cy.location('pathname').should('include', '/dashboard')
        });
        cy.visit('/')
        cy.url().should('include', '/dashboard')
    });
})