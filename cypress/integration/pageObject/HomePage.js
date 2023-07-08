class HomePage {
  getNameInput() {
    return cy.get(":nth-child(1) > .form-control");
  }
  getGenderInput() {
    return cy.get("#exampleFormControlSelect1");
  }
  getNameConfirmation() {
    return cy.get(":nth-child(4) > .ng-untouched");
  }
  getRadioDisabled() {
    return cy.get("#inlineRadio3");
  }
  getShopButton() {
    return cy.get(":nth-child(2) > .nav-link");
  }
}

export default HomePage;
