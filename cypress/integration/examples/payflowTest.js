describe("Payflow Dashboard Test Suite", function () {
  it("Log in", function () {
    cy.visit("https://dashboard.payflow-dev.net/auth/super/login");
    cy.get(
      "#root > div > div > div > div > div > div > div.MuiCardContent-root.jss9 > div > form > div > div:nth-child(1) > div > input"
    ).type("ca");
    cy.get(
      "#root > div > div > div > div > div > div > div.MuiCardContent-root.jss9 > div > form > div > div:nth-child(1) > div > input"
    ).should("have.string", "Not valid");
  });
});
