export function loginWithMFA(email, password, mfaCode){
    fillEmalPasswordAndSubmit(email, password);
    cy.url().should('include', '/mfa');
    cy.get('input[name="mfa_code"]').type(mfaCode);
    cy.get('button[type="submit"]').click();

}