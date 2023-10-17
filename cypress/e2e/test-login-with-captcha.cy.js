/// <reference types='cypress'/>

const { fillEmalPasswordAndSubmit, fillEmail, fillPassword } = require("../utils/loginFormsInput");
const validEmail = Cypress.env('validEmail');
const invalidPassword = Cypress.env('invalidPassword');
const validPassword = Cypress.env('validPassword');

describe('Test login with Captcha', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('TC004 - Login with valid Captcha', () => {
        fillEmail(validEmail);
        for (let i = 0; i < 3; i++) {
            fillPassword(invalidPassword);
            cy.get('button[type=submit]').click();
        };
        cy.get('[data-testid="loginRecaptcha"]').should('be.visible').click();
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/dashboard');
    });

    it("TC005 - Shouldn't login with invalid Captcha", () => {
        fillEmail(validEmail);
        for (let i = 0; i < 3; i++) {
            fillPassword(invalidPassword);
            cy.get('button[type=submit]').click();
        };
        cy.request({
            method: 'POST',
            url: 'https://api.abtasty.com/api/oauth/login',
            body: {
                email: validEmail,
                password: validPassword,
                captcha: 'invalid captcha'
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq('Captcha not valid');

        })
        cy.url().should('include', '/login');
    });
})