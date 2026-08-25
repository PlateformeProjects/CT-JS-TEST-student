import {
  addToCart,
  removeFromCart,
  calculateSubtotal,
  applyDiscountCode,
  calculateTotal
} from "./cart.js";

import {
  fetchProducts,
  renderProducts,
  updateCartDOM
} from "./dom-cart.js";

const state = {
  products: [],
  cart: [],
  promoCode: "",
  taxRate: 0.20
};

const productsContainer = document.getElementById("products-container");
const cartContainer = document.getElementById("cart-container");
const promoInput = document.getElementById("promo-code");
const applyPromoBtn = document.getElementById("btn-apply-promo");
const promoMessage = document.getElementById("promo-message");
const checkoutBtn = document.getElementById("btn-checkout");
const modal = document.getElementById("checkout-modal");
const modalCloseBtn = document.getElementById("btn-close-modal");
const orderIdSpan = document.getElementById("order-id");

function render() {
  const subtotal = calculateSubtotal(state.cart);
  let subtotalAfterDiscount = subtotal;

  try {
    subtotalAfterDiscount = applyDiscountCode(subtotal, state.promoCode);
  } catch (err) {
    state.promoCode = "";
  }

  const finalTotal = calculateTotal(subtotalAfterDiscount, state.taxRate);

  updateCartDOM(
    state.cart,
    cartContainer,
    subtotal,
    finalTotal,
    handleRemoveFromCart
  );
}

function handleAddToCart(product) {
  try {
    state.cart = addToCart(state.cart, product, 1);
    render();
  } catch (err) {
    alert(`Erreur : ${err.message}`);
  }
}

function handleRemoveFromCart(productId) {
  state.cart = removeFromCart(state.cart, productId);
  render();
}

function handleApplyPromo() {
  const code = promoInput.value.trim().toUpperCase();
  promoMessage.className = "promo-message-text";

  if (!code) {
    state.promoCode = "";
    promoMessage.textContent = "";
    render();
    return;
  }

  try {
    const subtotal = calculateSubtotal(state.cart);
    applyDiscountCode(subtotal, code);
    
    state.promoCode = code;
    promoMessage.textContent = `Code [${code}] applique avec succes !`;
    promoMessage.classList.add("success");
    render();
  } catch (error) {
    promoMessage.textContent = error.message;
    promoMessage.classList.add("error");
  }
}

function handleCheckout() {
  if (state.cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  const orderId = "CMD-" + Math.floor(10000 + Math.random() * 90000);
  orderIdSpan.textContent = orderId;

  modal.classList.remove("hidden");

  state.cart = [];
  state.promoCode = "";
  promoInput.value = "";
  promoMessage.textContent = "";
  render();
}

function handleCloseModal() {
  modal.classList.add("hidden");
}

async function init() {
  applyPromoBtn.addEventListener("click", handleApplyPromo);
  checkoutBtn.addEventListener("click", handleCheckout);
  modalCloseBtn.addEventListener("click", handleCloseModal);

  try {
    state.products = await fetchProducts("/products.json");
    renderProducts(state.products, productsContainer, handleAddToCart);
  } catch (error) {
    productsContainer.innerHTML = `<p class="error-message" style="color: var(--error-color); font-weight: bold;">[FAIL] ${error.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", init);
