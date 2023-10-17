/// <reference types="cypress" />

const cypress = require("cypress");
const { loginWithMFA } = require("../utils/loginWithMFA");
const { fillEmalPasswordAndSubmit } = require("../utils/loginFormsInput");

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');
const abtastyEmail = 'testuser@abtasty.com'
const validMfaCode = 'validMfaCode'
const invalidMfaCode = 'invalidMfaCode'


describe('Test login with MFA', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('TC006 - Login abtasty.com user with MFA', () => {
        loginWithMFA(abtastyEmail, validPassword, validMfaCode)
        cy.url().should('include', '/dashboard');
    });

    it('TC007 - Login abtasty.com user with MFA and invalid MFA code', () => {
        loginWithMFA(abtastyEmail, validPassword, invalidMfaCode)
        cy.contains('Oops! The code you entered is incorrect. Please try again').should('be.visible');
        cy.url().should('include', '/mfa');
    });

    it('TC008 - Login any user with MFA', () => {
        loginWithMFA(validEmail, validPassword, validMfaCode)
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });

    it('TC009 - Check MFA code is expired after 1 minute and resend code', () => {
        loginWithMFA(abtastyEmail, validPassword, validMfaCode);
        cy.wait(60000);
        cy.get('button[type="submit"]').click();
        cy.contains('Oops! The code you entered is incorrect. Please try again').should('be.visible');
        cy.url().should('include', '/mfa');
        cy.get('a').contains('Return to login').click();
        cy.url().should('include', '/login');
        cy.go('forward');
        cy.contains('Resend code').click();
        cy.get('input[name="mfa_code"]').type(validMfaCode);
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });

    it('TC010 - Check save the device in session storage', () => {
        loginWithMFA(abtastyEmail, validPassword, validMfaCode);
        cy.get('input[name="save_device"]').check();
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
        cy.contains('Logout').click();
        cy.url().should('include', '/login');
        fillEmalPasswordAndSubmit(abtastyEmail, validPassword);
        cy.url().should('include', '/dashboard');
    });
});
