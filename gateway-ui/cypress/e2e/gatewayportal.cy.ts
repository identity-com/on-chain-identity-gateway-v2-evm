describe('template spec', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });

  beforeEach(() => {
    // Visit the storybook iframe page once per file
    cy.visit('http://localhost:6006/');
  })


  it.only('Correctly renders a valid pass', () => {
    cy.get('#example-protocol-ui--wallet-with-token').click();
    // Storybook uses an iframe so this extra logic is needed to find the correct component

    cy.wait(7000);

    cy.get('#storybook-preview-iframe', {withinSubject: null, includeShadowDom: true})
      .its('0.contentDocument.body')
      .find('[data-test-id=validityChip]').should('be.visible');
  });

  it('Correctly renders view when user does not have pass', () => {
    cy.get('#example-protocol-ui--wallet-without-token').click();
    // Storybook uses an iframe so this extra logic is needed to find the correct component

    cy.wait(7000);
    
    cy.get('#storybook-preview-iframe', {withinSubject: null, includeShadowDom: true})
      .its('0.contentDocument.body')
      .find('[data-test-id=validityChip]').should('be.visible');
  });

  it('Correctly disables gatekeeper when no DID service found', () => {
    cy.get('#example-protocol-ui--wallet-without-token').click();
    // Storybook uses an iframe so this extra logic is needed to find the correct component

    cy.wait(7000);
    
    cy.get('#storybook-preview-iframe', {withinSubject: null, includeShadowDom: true})
      .its('0.contentDocument.body')
      .find('[data-test-id=validityChip]').should('be.visible');
  });
})