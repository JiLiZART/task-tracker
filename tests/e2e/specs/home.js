// https://docs.cypress.io/api/introduction/api.html

describe("Home Page", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h2", "Your team's task tracker and project management tool.");
    cy.contains(
      "p",
      "Runby makes it easy to organize your tasks, projects and conversations in a shared space."
    );
    cy.get('input[type="email"]')
      .invoke("attr", "placeholder")
      .should("contain", "Email address");
    cy.get('input[type="email"]')
      .invoke("attr", "autofocus")
      .should("contain", "autofocus");
  });
});
