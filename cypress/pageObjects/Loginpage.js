class LoginPage {
    getUsernameField(){
    return cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
    }
    getPasswordField(){
    return cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input')
    }
    getLoginBtn(){
    return cy.get('.oxd-button')
    }
    getDashboardTxt(){
    return cy.get('.oxd-topbar-header-breadcrumb > .oxd-text')
    }
    getToast(){
    return cy.get('.oxd-alert-content > .oxd-text')
    }
    getusername(){
    return cy.get('.oxd-userdropdown-name')
    }
    getloginTxt(){
    return cy.get('.oxd-text--h5')
    }

} export default LoginPage