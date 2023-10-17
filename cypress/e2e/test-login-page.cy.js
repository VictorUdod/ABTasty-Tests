/// <reference types = 'cypress'/>



const invalidPassword = Cypress.env('invalidPassword');
const validEmail = Cypress.env('validEmail');

describe('Test Forms, Navigation and Adaptability', () => {
  beforeEach(() => {
    cy.visit("/")
    });

    it('TC014 - Check Forms, Links and Back button', () => {
        cy.url().should('include', 'login');
        cy.title().should('contain', 'AB Tasty - Experience Optimization Platform');
        cy.get('img').should('be.visible');
        cy.get('h1').should('contain', 'Sign in to your account');
        cy.get('[data-testid="inputWrapper"]').first().should('contain', 'E-mail').and('be.visible');
        cy.get('[data-testid="inputWrapper"]').last().should('contain', 'Password').and('be.visible');
        cy.get('a').contains('Forgot your password?').should('be.visible').click();
        cy.url().should('include', 'reset-password');
        cy.go('back');
        cy.url().should('include', 'login');
        cy.get('button[type=submit]').should('be.visible').and('not.be.enabled');
        cy.get('#GOOGLE_SIGN_IN_BUTTON').should('be.visible');
        cy.get('button').contains('Sign in with SSO').should('be.visible').and('be.enabled').click();
        cy.url().should('include', 'sso')
        cy.go('back');
        cy.url().should('include', 'login')
        cy.get('p').contains('Learn more about our')
        .find('a')
        .should('have.attr', 'href', 'https://www.abtasty.com/privacy-policy/')
        .and('contain.text', 'Privacy Policy')
        .and('be.visible');
    });

    it('TC015 - Check submit button', () => {
        cy.get('#email').type(validEmail);
        cy.get('#password').click();
        cy.get('button[type=submit]').should('be.visible').and('not.be.enabled');
        cy.get('#email').clear();
        cy.get('#password').type(validEmail);
        cy.get('button[type=submit]').should('be.visible').and('not.be.enabled');
        cy.get('#email').type(validEmail);
        cy.get('button[type=submit]').should('be.visible').and('be.enabled');
    });

    it('TC016 - Check responsive design below 1024px width', () => {
        cy.viewport(1024, 768);
        cy.get('.Layout-module__leftColumn___k9YFz')
        .should('be.visible')
        .should('have.css', 'width', '1024px')
        .should('have.css', 'height', '768px');
    });

    it('TC017 - Login page is well translated in EN, FR, ES, and DE', () => {
        cy.get('[data-testid=language-dropdown]').click();
        cy.get('[data-testid=language-option-fr]').should('exist');
        cy.get('[data-testid=language-option-es]').should('exist');
        cy.get('[data-testid=language-option-de]').should('exist');
        cy.get('[data-testid=language-option-en]').should('exist');
    });
})