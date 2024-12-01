// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
//-- This is a parent command --
Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
          "email": email,
          "password": senha
        }
      }).then(response => {
        return response.body.authorization
      })
 })

 Cypress.Commands.add('cadastrarProdutos', (token, prodt, valor, descr, qntd) => {
    cy.request({
        method: 'POST',
        url: 'produtos',
        headers: {authorization: token},
        body: {
            "nome": prodt,
            "preco": valor,
            "descricao": descr,
            "quantidade": qntd
          }, 
        failOnStatusCode: false
    })
 })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })