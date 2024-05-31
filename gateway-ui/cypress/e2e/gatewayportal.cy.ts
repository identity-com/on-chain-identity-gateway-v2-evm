describe('template spec', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });

  const issuerTestnetAddress = '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720';

  beforeEach(() => {
    // Visit the storybook iframe page once per file
    cy.visit('http://localhost:6006/');
  })


  it('Correctly renders a valid pass', () => {
    cy.get('#example-protocol-ui--wallet-with-token').click();
    // Storybook uses an iframe so this extra logic is needed to find the correct component

    cy.wait(7000);

    cy.get('#storybook-preview-iframe', {withinSubject: null, includeShadowDom: true})
      .its('0.contentDocument.body').find('#validityChip > span').contains('Valid Pass Detected');

    cy.get('#storybook-preview-iframe', {withinSubject: null, includeShadowDom: true})
      .its('0.contentDocument.body').find('#issuer').contains(issuerTestnetAddress);
  });

  it('Correctly renders view when user does not have pass and can click on a valid gatekeeper', () => {
    cy.get('#example-protocol-ui--wallet-without-token').click();
    // Storybook uses an iframe so this extra logic is needed to find the correct component

    cy.wait(7000);
    
    cy.get('#storybook-preview-iframe', {withinSubject: null, includeShadowDom: true})
      .its('0.contentDocument.body')
      .find('#validityChip > span')
      .contains('No Pass Detected');
    
    cy.get('#storybook-preview-iframe', {withinSubject: null, includeShadowDom: true})
      .its('0.contentDocument.body')
      .find("#validLink-Finclusive")
      .should("have.attr", "href", "https://finclusive.com/");

    cy.get('#storybook-preview-iframe', {withinSubject: null, includeShadowDom: true})
      .its('0.contentDocument.body')
      .find("#validLink-Finclusive")
      .click({force: true});

    cy.wait(2000);
  });

  it('Correctly disables gatekeeper when no DID service found', () => {
    cy.get('#example-protocol-ui--wallet-without-token').click();

    cy.wait(7000);

    cy.get('#storybook-preview-iframe', {withinSubject: null, includeShadowDom: true})
      .its('0.contentDocument.body')
      .find('#validityChip > span')
      .contains('No Pass Detected');


    cy.get('#storybook-preview-iframe', {withinSubject: null, includeShadowDom: true})
      .its('0.contentDocument.body')
      .find('#invalidLink').should('be.hidden').should('be.disabled');
  });
})