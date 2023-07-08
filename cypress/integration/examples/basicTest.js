describe("My first test suite", function () {
  it("My first test", function () {
    cy.visit(Cypress.env("url") + "/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);
    // Alias command to reuse locators: set variables in Cypress using .as
    cy.get(".products").as("productLocator");
    cy.get("@productLocator");
    cy.get("@productLocator").find(".product").should("have.length", 4);
    //Select a certain product from the array
    cy.get("@productLocator")
      .find(".product")
      .eq(2)
      .contains("ADD TO CART")
      .click();
    //Dimanically loop through the array of products
    cy.get(".products")
      .find(".product")
      .each(($el, index, $list) => {
        const textVeg = $el.find("h4.product-name").text();
        if (textVeg.includes("Cashews")) {
          $el.find("button").click();
        }
      });
    //Assert if logo text is correctly displayed
    cy.get(".brand").should("have.text", "GREENKART");

    //Print something in Cypress console. Remember Cypress is Asycronous,
    //if you want to run sycronous code like.text() you need to resolve promise
    cy.get(".brand").then(function (logoElement) {
      cy.log(logoElement.text());
    });
  });
});
