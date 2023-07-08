import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../pageObject/HomePage";
import ProductPage from "../../../pageObject/ProductPage";

const homePage = new HomePage();
const productPage = new ProductPage();
let name;

Given("I open ecommerce web page", () => {
  cy.visit(Cypress.env("url") + "/angularpractice/");
});

When("I go to shop screen", function () {
  homePage.getShopButton().click();
});

When("I select two products", function () {
  this.data.product.map((elem) => {
    cy.addToCart(elem);
  });
});

When("I click on shop button", () => {
  productPage.checkoutButton().click();
});

// Then('the cart has 2 products inside', () => {

// })

Then("two products are displayed in checkout page", function () {
  let sum = 0;
  //Loop through every element that contains a number.
  cy.get("tr td:nth-child(4) strong")
    .each((el) => {
      const amount = el.text();
      //Separate the currency sign and number
      let result = amount.split(" ");
      //Remove any white space before number
      result = result[1].trim();

      //Sum each result obtained in each iteration and save it in sum variable and convert result into a number
      sum = sum + parseInt(result);
    })
    .then(function () {
      cy.log(sum);
    });
  //In this step you need to compare the total to the sum
  cy.get("h3 strong").then(function (element) {
    const amountText = element.text();
    let result = amountText.split(" ");
    let total = result[1].trim();
    expect(parseInt(total)).to.equal(sum);
  });
});

//Para pasarle los valores de la data table tienes que pasarle un argumento
//a la función. Lugo tienes que convertirlo en una rawTable que es un array
//de dos dimensiones
When("I fill the form with the following data", function (dataTable) {
  //Segunda fila primera columna
  name = dataTable.rawTable[1][0];
  homePage.getNameInput().type(name);
  homePage.getGenderInput().select(dataTable.rawTable[1][1]);
});

Then("validate the form behavior", function (dataTable) {
  homePage.getNameConfirmation().should("have.value", name);
  homePage.getNameInput().should("have.attr", "minlength", "2");
  homePage.getRadioDisabled().should("be.disabled");
});
