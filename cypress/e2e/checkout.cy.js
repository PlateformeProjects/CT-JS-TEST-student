describe("Tests E2E - Tunnel d'Achat", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("devrait afficher le titre de l'application et charger le catalogue", () => {
    cy.get(".app-header h1").should("contain.text", "Le Panier de Livres");
    cy.get(".products-grid .product-card").should("have.length", 4);
  });

  it("devrait derouler un parcours utilisateur complet avec succes", () => {
    cy.get(".products-grid .product-card")
      .contains("Introduction a Jest")
      .parents(".product-card")
      .find(".btn-add")
      .click();

    cy.get(".products-grid .product-card")
      .contains("JavaScript Moderne ES6+")
      .parents(".product-card")
      .find(".btn-add")
      .click();

    cy.get(".cart-items-list .cart-item").should("have.length", 2);
    
    cy.get(".cart-items-list")
      .should("contain.text", "Introduction a Jest")
      .should("contain.text", "JavaScript Moderne ES6+");

    cy.get(".summary-subtotal").should("contain.text", "34.49");
    cy.get(".summary-total").should("contain.text", "41.39");

    cy.get("#promo-code").type("LIVRE10");
    cy.get("#btn-apply-promo").click();

    cy.get("#promo-message")
      .should("be.visible")
      .should("have.class", "success")
      .should("contain.text", "Code [LIVRE10] applique avec succes !");

    cy.get(".summary-total").should("contain.text", "37.25");

    cy.get("#btn-checkout").click();

    cy.get("#checkout-modal")
      .should("be.visible")
      .should("not.have.class", "hidden");

    cy.get("#order-id")
      .invoke("text")
      .should("match", /^CMD-\d+$/);

    cy.get("#btn-close-modal").click();

    cy.get("#checkout-modal").should("have.class", "hidden");
    cy.get(".empty-cart-message").should("be.visible").should("contain.text", "Votre panier est vide.");
  });
});
