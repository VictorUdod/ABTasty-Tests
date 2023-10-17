/// <reference types="cypress" />

const { invalidCredintialsLogin } = require("../utils/invalidCredentialsLogin");
const { fillEmalPasswordAndSubmit, fillEmail, fillPassword } = require("../utils/loginFormsInput");
const { responseCode } = require("../utils/responceCode");

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');
const invalidEmail = Cypress.env('invalidEmail');
const invalidPassword = Cypress.env('invalidPassword');
const invalidEmails = Cypress.env('invalidEmails');



describe('Test login with credentials', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.intercept('/api/oauth/login').as('login');
    })

    it('TC001 - should login successfully with valid credentials', () => {
        fillEmalPasswordAndSubmit(validEmail, validPassword);
        cy.contains('Please enter a valid email').should('not.exist');
        cy.contains('Please enter a valid email or password').should('not.exist');
        responseCode(200);
        cy.url().should('include', '/dashboard');
    });

    it("TC002 - shouldn't login successfully and display error message for invalid email/password", () => {

        for (let email of invalidEmails) {
            fillEmail(email);
            cy.get('#password').click();
            cy.contains('Please enter a valid email').should('be.visible');
            cy.contains('Please enter a valid email or password').should('not.exist');
        };

        invalidCredintialsLogin(invalidEmail, invalidPassword, 400);
        invalidCredintialsLogin(validEmail, invalidPassword, 400);
        invalidCredintialsLogin(invalidEmail, validPassword, 400);
    });
})