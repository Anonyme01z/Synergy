import LoginPage from "../pageObjects/Loginpage.js";
import DashboardPage from "../pageObjects/Dashboardpage.js";
import AdminPage from "../pageObjects/Adminpage.js";
import jsonData from "../fixtures/jsonData.config.json";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const adminPage = new AdminPage();

Cypress.Commands.add('Login', () => {
  const { Username, Password, DashboardURL, Invalidusername, InvalidPassword, UN, AdminURL } = jsonData.credentials;


  //Invalid Username and Valid password
  loginPage.getUsernameField().type(Invalidusername);
  loginPage.getPasswordField().type(Password);
  loginPage.getLoginBtn().should('contain', 'Login').click();
  loginPage.getToast().should('have.text', 'Invalid credentials')

  //Valid Username and invalid password
  loginPage.getUsernameField().clear().type(Username);
  loginPage.getPasswordField().clear().type(InvalidPassword);
  loginPage.getLoginBtn().should('contain', 'Login').click();
  loginPage.getToast().should('have.text', 'Invalid credentials')

  //Invalid Username and invalid password
  loginPage.getUsernameField().clear().type(Invalidusername);
  loginPage.getPasswordField().clear().type(InvalidPassword);
  loginPage.getLoginBtn().should('contain', 'Login').click();
  loginPage.getToast().should('have.text', 'Invalid credentials')

  // Valid Username and Password
  cy.reload()
  loginPage.getUsernameField().clear().type(Username);
  loginPage.getPasswordField().clear().type(Password);
  loginPage.getLoginBtn().should('contain', 'Login').click();
  loginPage.getDashboardTxt().should('have.text', 'Dashboard')
  cy.wait(5000)
  cy.url().should('include', DashboardURL);

  dashboardPage.getTimeAtWorkTxt().should('have.text', 'Time at Work')
  dashboardPage.getThisWeek().should('have.text', 'This Week')
  dashboardPage.getMyActions().should('have.text', 'My Actions').scrollIntoView()
  dashboardPage.getQuickLaunch().should('have.text', 'Quick Launch').scrollIntoView()

  //Admin Actions
  dashboardPage.getAdminSideBar().should('have.text', 'Admin').click()
  cy.url().should('include', AdminURL);
  adminPage.getHeader().should('have.text', 'AdminUser Management')

  //Search by Username
  adminPage.getRecNum().should('contain', 'Records Found')
  adminPage.getUsernameField().type(UN)
  adminPage.getSearchBtn().should('contain', 'Search').click()
  adminPage.getRecNum().should('have.text', '(1) Record Found')
  adminPage.getUsernameColumn().contains(UN)

   // Search by Employee Name
   adminPage.getEmpNameField().type('ana')
   cy.wait(2500)
   adminPage.getOutLayer().click()
   adminPage.getInv().should('contain', 'Invalid')
   adminPage.getEmpNameField().clear().type('Sania')
   cy.wait(4000)
   cy.contains('Sania Shaheen').click()
   adminPage.getSearchBtn().should('contain', 'Search').click()
   adminPage.getRecNum().should('have.text', 'No Records Found')
   adminPage.getTable().should('not.have.text')

   //Reset Search
   adminPage.getResetBtn().contains('Reset').click()

   //Search by User Role
   adminPage.getRole().click()
   cy.contains('ESS').click()
   adminPage.getSearchBtn().click()
   adminPage.getRecNum().should('contain', 'Records Found')
   adminPage.getResetBtn().contains('Reset').click()

   //Search by Status
   adminPage.getStatus2().click()
   cy.contains('Disabled').click()
   adminPage.getSearchBtn().click()
   adminPage.getRecNum().should('contain', 'Records Found')


    //Table Assertions
    adminPage.getResetBtn().contains('Reset').click()
    cy.get('.oxd-table-body').should('exist');
    cy.get('.orangehrm-container').contains('Admin').should('exist');
    cy.get('.oxd-table-body').contains('Enabled').should('exist');
    cy.get('.oxd-table-row').contains('Bob Tester').should('exist'); // Assuming Bob Tester exists in the table
})
