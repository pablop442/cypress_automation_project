describe("Automation Practice", function () {
  it("Special Elements", function () {
    cy.visit(Cypress.env("url") + "/AutomationPractice/");
    //Select a checkbox element
    cy.get("#checkBoxOption1")
      .check()
      .should("be.checked")
      .and("have.value", "option1");
    cy.get("#checkBoxOption1").uncheck().should("not.be.checked");
    //Select multiple checkboxes based un element type.
    //Notice you'll need to pass an array with values names.
    cy.get('input[type="checkbox"]').check(["option2", "option3"]);
    //Select static dropdowns
    cy.get("select").select("option2").should("have.value", "option2");
    //Select dynamic dropdowns. You'll need to select the common element
    //Then you'll need to go through all options
    cy.get("#autocomplete").type("ve");
    cy.get(".ui-menu-item div").each((el) => {
      if (el.text() === "Venezuela") {
        el.click();
      }
    });
    //After first validation, you need to make sure the value is on the input
    cy.get("#autocomplete").should("have.value", "Venezuela");
    //Element is displayed or not
    cy.get("#displayed-text").should("be.visible");
    cy.get("#hide-textbox").click();
    cy.get("#displayed-text").should("not.be.visible");
    cy.get("#show-textbox").click();
    cy.get("#displayed-text").should("be.visible");

    //Radio buttons

    cy.get('[value="radio2"]').check().should("be.checked");

    //Alerts and Pop ups
    //Remember cypress auto accepts alert and pop ups
    cy.get("#alertbtn").click();
    cy.get("#confirmbtn").click();
    //If you want to check the alert text you will have to trigger an event
    //through cypress. In this example, test will fail.
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Hello , share this practice page and share your knowledge"
      );
    });
    //Cypress cannot open new tabs or child tabs. So we need to invoke JQuery functions
    //to remove attribute 'Target' from <a> tag in HTML
    cy.get("#opentab").invoke("removeAttr", "target").click();
    //To navigate within the browser we can use .go command
    cy.url().should("include", "rahulshettyacademy");

    cy.go("back");

    //To select an specific row from a table you need to loop over it
    //The challenge is to validate the column besides the row
    //First select the specific column in the table
    cy.get("tr td:nth-child(2)").each(($el, index, $list) => {
      const text = $el.text();
      if (text.includes("Python")) {
        //We use .eq method to bring the exact element that is beside index that has Python word
        //Next method needs to be after the get.
        //Remember that in order to use a JQuery method (text) you need to resolve the promise
        //with .then
        cy.get("tr td:nth-child(2)")
          .eq(index)
          .next()
          .then(function (price) {
            const priceText = price.text();
            expect(priceText).to.equal("25");
          });
      }
    });
    //Mouse hover. Cypress does not support mouse hover
    //You will need to use JQuery method show
    cy.get("div.mouse-hover-content").invoke("show");
    //In case you don't want to check that menu is displayed
    //Cypress allows to click on hidden elements by adding
    // cy.contains('Top').click({force:true})
    cy.contains("Top").click();
    cy.url().should("include", "top");
  });
});
