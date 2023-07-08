class CheckoutPage {
  buyButton() {
    return cy.get(":nth-child(4) > :nth-child(5) > .btn");
  }
  countryInput() {
    return cy.get("#country");
  }
  termsAndConditionsCheck() {
    return cy.get("#checkbox2");
  }
  finalPurchaseButton() {
    return cy.get(".ng-untouched > .btn");
  }
}

export default CheckoutPage;
