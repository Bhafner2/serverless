/// <reference types="Cypress" />

/// JSON fixture file can be loaded directly using
// the built-in JavaScript bundler

context('Files', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  beforeEach(() => {
    // Instead of writing a response inline you can
    // use a fixture file's content.
    cy.fixture('users.json')
      .as('usersJSON')
      .then((users) => {
        localStorage.setItem('users', JSON.stringify(users));
      });
  });

  it('cy.fixture() - load a fixture', function () {
    // https://on.cypress.io/fixture

    cy.fixture('users').should((user) => {
      expect(user[0].firstName).to.eq('Michael');
    });

    // to access the aliased object directly, the test needs to have a reference to the
    // context (this) - so no arrow functions!
    expect(this.usersJSON).to.deep.eq(JSON.parse(localStorage.getItem('users')));
  });
});
