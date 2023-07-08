//Aquí tienes que declarar el hook beforeEach que a diferencia del hook before, este se va a ejecutar antes de cada escenario. Esto te sirve para tener acceso al objeto data del archivo fixtures

beforeEach(() => {
  cy.fixture("example").then(function (data) {
    this.data = data;
  });
});
