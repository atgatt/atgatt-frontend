// https://docs.cypress.io/api/introduction/api.html

describe('Smoke Check', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
  })
})
