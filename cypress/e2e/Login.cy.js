/// <reference types="cypress"/>
import jsonData from "../fixtures/jsonData.config.json"
import LoginPage from "../pageObjects/Loginpage.js"

const loginPage = new LoginPage();

describe('ADMIN', {
    viewportHeight: 1300,
    viewportWidth: 960,
  });

  beforeEach(() => {
    const SynergyUrl = jsonData.stagingUrl
    cy.visit(Cypress.env(`${Cypress.env('environment')}Url`));
    cy.title().should('eq', 'OrangeHRM');
    cy.url().should('eq', SynergyUrl)
    loginPage.getloginTxt().should('be.visible').wait(5000)
  });



  it('Synergy' , () => {
    cy.Login();
  });