Feature: End to end test

    Regression test of example ecommerce web
    Scenario: Adding products to the cart
        Given I open ecommerce web page
        When I go to shop screen
        And I select two products
        And I click on shop button
        Then two products are displayed in checkout page

    Scenario: Fill the form to shop
        Given I open ecommerce web page
        When I fill the form with the following data
            | name | gender |
            | Luca | Male   |
        Then validate the form behavior