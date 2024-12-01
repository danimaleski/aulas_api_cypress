/// <reference types= "cypress"/>

describe('Teste de API - Login', () => {
  it('Deve realizar login com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
        "email": "fulano@qa.com",
        "password": "teste"
      }
    }).then((response) => {
      cy.log(response.body.authorization) // cy.log só funciona com then e não com should, e funciona para ver o token do login
      expect(response.body.message).to.equal('Login realizado com sucesso')
      expect(response.status).to.equal(200)
    })
  })
})