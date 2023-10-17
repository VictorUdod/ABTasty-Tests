export function responseCode(statusCode){
    cy.wait('@login').then(($login) => {
        expect($login.response.statusCode).to.eq(statusCode);
    })
}