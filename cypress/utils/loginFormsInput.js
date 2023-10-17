
export function fillEmail(email){
    cy.get('#email').clear().type(email);
};

export function fillPassword(password){
    cy.get('#password').clear().type(password);
};

export function fillEmalPasswordAndSubmit(email, password){
    fillEmail(email);
    fillPassword(password);
    cy.get('button[type=submit]').click();
};

