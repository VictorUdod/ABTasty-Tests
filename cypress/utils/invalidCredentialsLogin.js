import { fillEmalPasswordAndSubmit } from "./loginFormsInput";
import { responseCode } from "./responceCode";

export function invalidCredintialsLogin(email, password, statusCode){
    fillEmalPasswordAndSubmit(email, password);
    responseCode(statusCode);
    cy.contains('Please enter a valid email or password').should('be.visible');
}