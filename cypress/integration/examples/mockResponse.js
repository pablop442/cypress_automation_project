describe("My First Test Suite", function () {
  it("Mocking response test", function () {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

    //Metodo utilizado para mockear responses. Usa dos argumentos
    //Uno es el object received y el otro el object sent
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },

      {
        //En este caso queremos que nos devuelva un solo registro y luego con el .as guardamos el metodo como una variable
        statusCode: 200,
        body: [
          {
            book_name: "RestAssured with Java",
            isbn: "RSU",
            aisle: "2301",
          },
        ],
      }
    ).as("bookretrievals");
    cy.get("button[class='btn btn-primary']").click();
    //Debemos esperar a que se haga el click para llamar al método con nuestra response costumizada
    //Con el argumento response tienes acceso a la respuesta que recibes del backend
    cy.wait("@bookretrievals").should(({ request, response }) => {
      cy.get("tr").should("have.length", response.body.length + 1);
    });
    cy.get("p").should("have.text", "Sorry we have only one book available");

    //length of the response array = rows of the table
  });
});
