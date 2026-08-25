export function addToCart(cart, product, quantity) {
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  const newCart = cart.map(item => ({ ...item }));

  if (existingItemIndex > -1) {
    newCart[existingItemIndex].quantity = quantity;
  } else {
    newCart.push({
      ...product,
      quantity: quantity
    });
  }

  return newCart;
}

export function removeFromCart(cart, productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart.splice(index, 1);
  }
  return cart;
}

export function calculateSubtotal(cart) {
  return cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
}

export function applyDiscountCode(subtotal, code) {
  if (!code) {
    return subtotal;
  }

  if (code === "LIVRE10") {
    return subtotal - 10;
  }

  if (code === "LIVRE5OFF") {
    return subtotal - 5;
  }

  return subtotal;
}

export function calculateTotal(subtotal, taxRate) {
  if (taxRate < 0) {
    throw new Error("Le taux de taxe doit etre positif ou nul");
  }

  return subtotal * (1 + taxRate);
}
