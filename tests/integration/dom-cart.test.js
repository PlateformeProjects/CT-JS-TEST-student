import {
  fetchProducts,
  renderProducts,
  updateCartDOM
} from "../../src/dom-cart.js";

describe("Tests d'Intégration - DOM & API (dom-cart.js)", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.resetAllMocks();
  });

  describe("fetchProducts", () => {
    test("devrait recuperer les produits et les parser en JSON", async () => {
      const mockProducts = [
        { id: 1, title: "Livre A", price: 10 },
        { id: 2, title: "Livre B", price: 15 }
      ];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      });

      const result = await fetchProducts("/fake-api/products");

      expect(global.fetch).toHaveBeenCalledWith("/fake-api/products");
      expect(result).toEqual(mockProducts);
    });

    test("devrait lever une erreur explicite si le serveur renvoie un code HTTP d'erreur (ex: 500)", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ message: "Erreur interne" })
      });

      await expect(fetchProducts("/fake-api/products")).rejects.toThrow("Erreur de connexion au serveur");
    });
  });

  describe("renderProducts", () => {
    const products = [
      { id: 1, title: "Livre A", price: 10 },
      { id: 2, title: "Livre B", price: 15 }
    ];

    test("devrait injecter les cartes HTML des produits dans le conteneur", () => {
      renderProducts(products, container, jest.fn());

      const productCards = container.querySelectorAll(".product-card");
      expect(productCards).toHaveLength(2);

      expect(productCards[0].querySelector(".product-title").textContent).toBe("Livre A");
      expect(productCards[0].querySelector(".product-price").textContent).toBe("10.00 €");
      expect(productCards[1].querySelector(".product-title").textContent).toBe("Livre B");
    });

    test("devrait vider le conteneur avant de rendre de nouveaux produits pour eviter la duplication", () => {
      renderProducts(products, container, jest.fn());
      renderProducts(products, container, jest.fn());

      const productCards = container.querySelectorAll(".product-card");
      expect(productCards).toHaveLength(2);
    });

    test("devrait appeler le callback d'ajout de panier lors du clic sur le bouton d'un produit", () => {
      const onAddClickMock = jest.fn();
      renderProducts(products, container, onAddClickMock);

      const addButtons = container.querySelectorAll(".btn-add");
      addButtons[1].click();

      expect(onAddClickMock).toHaveBeenCalledTimes(1);
      expect(onAddClickMock).toHaveBeenCalledWith(products[1]);
    });
  });

  describe("updateCartDOM", () => {
    test("devrait afficher un message si le panier est vide", () => {
      updateCartDOM([], container, 0, 0, jest.fn());
      
      expect(container.querySelector(".empty-cart-message")).toBeTruthy();
      expect(container.querySelector(".empty-cart-message").textContent).toBe("Votre panier est vide.");
    });

    test("devrait afficher les articles du panier et les totaux calcules", () => {
      const cart = [
        { id: 1, title: "Livre A", price: 10, quantity: 2 },
        { id: 2, title: "Livre B", price: 15, quantity: 1 }
      ];

      updateCartDOM(cart, container, 35, 42, jest.fn());

      const items = container.querySelectorAll(".cart-item");
      expect(items).toHaveLength(2);

      expect(items[0].querySelector(".cart-item-title").textContent).toBe("Livre A");
      expect(items[0].querySelector(".cart-item-qty").textContent).toBe("x2");
      expect(items[0].querySelector(".cart-item-price").textContent).toBe("20.00 €");

      expect(container.querySelector(".summary-subtotal").textContent).toBe("35.00 €");
      expect(container.querySelector(".summary-total").textContent).toBe("42.00 €");
    });

    test("devrait appeler le callback onRemoveClick avec l'ID du produit lors du clic sur le bouton retirer", () => {
      const cart = [
        { id: 1, title: "Livre A", price: 10, quantity: 1 }
      ];
      const onRemoveClickMock = jest.fn();

      updateCartDOM(cart, container, 10, 12, onRemoveClickMock);

      const removeBtn = container.querySelector(".btn-remove");
      expect(removeBtn).toBeTruthy();

      removeBtn.click();

      expect(onRemoveClickMock).toHaveBeenCalledTimes(1);
      expect(onRemoveClickMock).toHaveBeenCalledWith(1);
    });
  });
});
