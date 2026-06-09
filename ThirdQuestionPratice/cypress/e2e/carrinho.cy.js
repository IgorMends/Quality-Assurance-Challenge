describe("Carrinho", () =>{
    it('Adcionar produto ao carrinho com sucesso', () =>{

        cy.visit('https://www.saucedemo.com')

        
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '1')

        cy.get('#shopping_cart_container').click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Backpack');
    })
    
})