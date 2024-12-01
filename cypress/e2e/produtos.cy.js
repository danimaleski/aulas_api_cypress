/// <reference types= "cypress"/>
import contrato from '../contratos/produtos.contratos'

describe('Testes de API em Produtos', () => {

    let token
    beforeEach(() => {
        cy.token('fulano@qa.com' , 'teste').then(tkn => {
            token = tkn //função com variáveis para expor o token, tkn seria a abreviação de token
        })
    });

    it.only('Deve validar contrato de produtos com sucesso', () => {
        cy.request('produtos').then(response => {
            return contrato.validateAsync(response.body)
        })
    });
    
    it('Deve listar produtos com sucesso - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
        })
    });

    it('Deve cadastrar produto com sucesso - POST', () => {
        let produto = 'Produto EBAC ' + Math.floor(Math.random() * 10000000)
        cy.cadastrarProdutos(token, produto, 2700, 'lava-louças', 10)
        .should((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        })
        
    });

    it('Deve validar mensagem de produto cadastrado anteriormente - POST', () => {
        cy.cadastrarProdutos(token, 'Lava Louça Midea', 2700, 'lava-louças', 10)
        .should((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).equal('Já existe produto com esse nome')
        })
    });

    it('Deve editar um produto com sucesso - PUT', () => {
        let produto = 'Produto EBAC Editaddo ' + Math.floor(Math.random() * 10000000)
        cy.cadastrarProdutos(token, produto, 2700, 'Produtos editados', 100)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'PUT', 
                    url: `produtos/${id}`,
                    headers: {authorization: token},
                    body: {
                        "nome": produto,
                        "preco": 200,
                        "descricao": "produto",
                        "quantidade": 250
                      }
                }).should(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                    expect(response.status).equal(200)
                })
            })
        
    });

    it('Deve deletar um produto com sucesso - DELETE', () => {
        cy.cadastrarProdutos(token, 'Produto delete', 250, 'Deletar', 100)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: {authorization: token}
                }).should(resp => {
                    expect(resp.body.message).to.equal('Registro excluído com sucesso')
                    expect(resp.status).equal(200)
                })
            })
    });
});