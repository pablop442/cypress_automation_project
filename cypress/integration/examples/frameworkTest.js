import HomePage from "../pageObject/HomePage";
import ProductPage from "../pageObject/ProductPage";
import CheckoutPage from "../pageObject/CheckoutPage";
//Esta clase viene de la carpeta pageObject con el objetivo de traer todos los elementos

describe("Framework Practice", function () {
  before(() => {
    //Con este método traes el archivo que tengas en fixtures.
    //Recuerda que debes resolver la promesa primero para acceder a la data
    //Como el parametro data está dentro del scope de la función .then
    //Debes declarar una nueva variable comun a toda la clase describe, usando .this
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });
  it("Type name and gender", function () {
    //Creas una variable para un nuevo objeto home page y así traer todos los métodos de la clase
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const checkoutPage = new CheckoutPage();

    cy.visit(Cypress.env("url") + "/angularpractice/");
    //Puedes acceder al objeto json usando siempre la variable global data
    homePage.getNameInput().type(this.data.name);
    homePage
      .getGenderInput()
      .select(this.data.gender)
      .should("have.value", this.data.gender);
    homePage.getNameConfirmation().should("have.value", this.data.name);
    //En la assertion should usamos el metodo JQuery para validar el contenido del atributo.
    homePage.getNameInput().should("have.attr", "minlength", "2");
    homePage.getRadioDisabled().should("be.disabled");
    homePage.getShopButton().click();
    //Usando el archivo commands de la carpeta support puedes crear métodos personalizados
    //En este caso estamos creando un método que recorre la lista de elementos
    //Y hace click en el elemento que contiene el texto que pasamos en el parámetro
    cy.addToCart("Nokia");
    //En caso de que hayan múltiples productos puedes utilizar el example.json y crear un array
    //Una vez tengas el array puedes recorrerlo y ejecutar la función para cada elemento
    this.data.product.map((elem) => {
      cy.addToCart(elem);
    });

    productPage.checkoutButton().click();
    //How to sum amounts in Cypress
    //Declare a variable initialized in zero
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
    checkoutPage.buyButton().click();
    checkoutPage.countryInput().type("Venezuela");
    checkoutPage.termsAndConditionsCheck().check({ force: true });
    checkoutPage.finalPurchaseButton().click();
  });
});
