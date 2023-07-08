describe("My First Test Suite", function () {
  it("API Test", function () {
    cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
      name: "Learn Appium Automation",
      isbn: "12233456",
      aisle: "234",
      author: "John Dos",
    }).then(function (response) {
      expect(response.body).to.have.property("Msg", "successfully added");
      expect(response.status).to.eq(200);
    });
  });
});
