/// <reference types="cypress" />

const validEmail = Cypress.env('validEmail');
const invalidEmail = Cypress.env('invalidEmail');
const invalidPassword = Cypress.env('invalidPassword');


describe('Check password', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('TC011 - Check password visibility', () => {
        cy.get('#password').type(invalidPassword);
        cy.get('#password').should('have.attr', 'type', 'password');
        cy.get('[data-testid="showIcon"]').click();
        cy.get('#password').should('have.attr', 'type', 'text');
        cy.get('[data-testid="hideIcon"]').click();
        cy.get('#password').should('have.attr', 'type', 'password');
    });

    it('TC012 - Check forgot password link with valid email', () => {
        cy.intercept('https://api.abtasty.com/api/oauth/reset_password/email').as('resetPassword');
        cy.get('a').contains('Forgot your password?').should('be.visible').and('have.attr', 'href', 'https://www.abtasty.com/forgot-password/').click();
        cy.url().should('include', '/reset-password');
        fillEmail(validEmail);
        cy.get('button[type=submit]').should('contain', 'Send me the password reset link').click();
        cy.wait('@resetPassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.message).to.eq('Email sent successfully');
        });
    });

    it('TC013 - Check forgot password link with invalid email', () => {
        cy.intercept('https://api.abtasty.com/api/oauth/reset_password/email').as('resetPassword');
        cy.get('a').contains('Forgot your password?').should('be.visible').and('have.attr', 'href', 'https://www.abtasty.com/forgot-password/').click();
        cy.url().should('include', '/reset-password');
        fillEmail(invalidEmail);
        cy.get('button[type=submit]').should('contain', 'Send me the password reset link').click();
        cy.wait('@resetPassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
            expect(interception.response.body.message).to.eq('Email sent successfully');
        });
    });


});