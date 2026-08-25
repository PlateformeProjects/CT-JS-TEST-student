import {
  addToCart,
  removeFromCart,
  calculateSubtotal,
  applyDiscountCode,
  calculateTotal
} from "../../src/cart.js";

describe("Tests Unitaires - Logique du Panier (cart.js)", () => {
  describe("addToCart", () => {
    test("devrait ajouter un nouveau produit dans un panier vide", () => {
      const cart = [];
      const product = { id: 1, title: "Livre A", price: 10 };
      
      const result = addToCart(cart, product, 2);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: 1, title: "Livre A", price: 10, quantity: 2 });
    });

    test("devrait additionner les quantités si le produit est déjà présent dans le panier", () => {
      const cart = [{ id: 1, title: "Livre A", price: 10, quantity: 2 }];
      const product = { id: 1, title: "Livre A", price: 10 };

      const result = addToCart(cart, product, 3);

      expect(result).toHaveLength(1);
      expect(result[0].quantity).toBe(5);
    });

    test("devrait lever une erreur si la quantité ajoutée est inférieure ou égale à 0", () => {
      const cart = [];
      const product = { id: 1, title: "Livre A", price: 10 };

      expect(() => {
        addToCart(cart, product, 0);
      }).toThrow("quantité");

      expect(() => {
        addToCart(cart, product, -5);
      }).toThrow();
    });

    test("ne devrait pas muter le panier d'origine (principe d'immutabilité)", () => {
      const cart = [{ id: 1, title: "Livre A", price: 10, quantity: 1 }];
      const product = { id: 2, title: "Livre B", price: 15 };

      const result = addToCart(cart, product, 1);

      expect(cart).toHaveLength(1);
      expect(result).not.toBe(cart);
    });
  });

  describe("removeFromCart", () => {
    test("devrait retirer le produit correspondant à l'ID", () => {
      const cart = [
        { id: 1, title: "Livre A", price: 10, quantity: 1 },
        { id: 2, title: "Livre B", price: 15, quantity: 2 }
      ];

      const result = removeFromCart(cart, 1);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
    });

    test("devrait renvoyer le panier inchangé si l'ID n'existe pas", () => {
      const cart = [{ id: 1, title: "Livre A", price: 10, quantity: 1 }];

      const result = removeFromCart(cart, 999);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });

    test("ne devrait pas muter le panier d'origine", () => {
      const cart = [{ id: 1, title: "Livre A", price: 10, quantity: 1 }];
      
      const result = removeFromCart(cart, 1);

      expect(cart).toHaveLength(1);
      expect(result).not.toBe(cart);
    });
  });

  describe("calculateSubtotal", () => {
    test("devrait renvoyer 0 si le panier est vide", () => {
      expect(calculateSubtotal([])).toBe(0);
    });

    test("devrait calculer la somme des produits en multipliant par leurs quantités", () => {
      const cart = [
        { id: 1, title: "Livre A", price: 10, quantity: 2 },
        { id: 2, title: "Livre B", price: 15, quantity: 3 }
      ];

      expect(calculateSubtotal(cart)).toBe(65);
    });
  });

  describe("applyDiscountCode", () => {
    test("devrait renvoyer le sous-total inchangé si le code est vide ou absent", () => {
      expect(applyDiscountCode(100, "")).toBe(100);
      expect(applyDiscountCode(100, null)).toBe(100);
    });

    test("devrait appliquer une réduction de 10% avec le code LIVRE10", () => {
      expect(applyDiscountCode(100, "LIVRE10")).toBe(90);
      expect(applyDiscountCode(50, "LIVRE10")).toBe(45);
    });

    test("devrait appliquer une réduction de 5€ avec le code LIVRE5OFF", () => {
      expect(applyDiscountCode(20, "LIVRE5OFF")).toBe(15);
    });

    test("devrait limiter le sous-total après réduction fixe à un minimum de 0 €", () => {
      expect(applyDiscountCode(3, "LIVRE5OFF")).toBe(0);
    });

    test("devrait lever une erreur si le code promo est inconnu", () => {
      expect(() => {
        applyDiscountCode(100, "CODE_INCORRECT");
      }).toThrow("Code promo invalide");
    });
  });

  describe("calculateTotal", () => {
    test("devrait ajouter la taxe au sous-total", () => {
      expect(calculateTotal(100, 0.20)).toBe(120);
      expect(calculateTotal(50, 0.05)).toBe(52.5);
    });

    test("devrait lever une erreur si le taux de taxe est négatif", () => {
      expect(() => {
        calculateTotal(100, -0.1);
      }).toThrow("taxe");
    });

    test("devrait arrondir le montant final TTC à 2 décimales", () => {
      const result = calculateTotal(10.3, 0.20);
      expect(result).toBe(12.36);
    });
  });
});
