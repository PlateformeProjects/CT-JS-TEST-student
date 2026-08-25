export async function fetchProducts(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Erreur de connexion au serveur");
  }
}

export function renderProducts(products, container, onAddClick) {
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.setAttribute("data-product-id", product.id);

    productCard.innerHTML = `
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">${product.price.toFixed(2)} €</p>
      </div>
      <button class="btn btn-add" data-id="${product.id}">
        Ajouter au panier
      </button>
    `;

    const addButton = productCard.querySelector(".btn-add");
    addButton.addEventListener("click", () => {
      onAddClick(product);
    });

    container.appendChild(productCard);
  });
}

export function updateCartDOM(cart, container, subtotal, finalTotal, onRemoveClick) {
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart-message">Votre panier est vide.</p>';
    return;
  }

  const itemsList = document.createElement("ul");
  itemsList.className = "cart-items-list";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.setAttribute("data-item-id", item.id);
    
    li.innerHTML = `
      <div class="cart-item-details">
        <span class="cart-item-title">${item.title}</span>
        <span class="cart-item-qty">x${item.quantity}</span>
        <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)} €</span>
      </div>
      <button class="btn-remove" data-id="${item.id}" aria-label="Retirer l'article">
        <svg class="icon-trash" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    `;

    const removeBtn = li.querySelector(".btn-remove");
    removeBtn.addEventListener("click", () => {
      onRemoveClick(item.id);
    });

    itemsList.appendChild(li);
  });

  container.appendChild(itemsList);

  const summary = document.createElement("div");
  summary.className = "cart-summary-totals";
  summary.innerHTML = `
    <div class="summary-row">
      <span>Sous-total :</span>
      <span class="summary-subtotal">${subtotal.toFixed(2)} €</span>
    </div>
    <div class="summary-row total-row">
      <span>Total TTC :</span>
      <span class="summary-total">${finalTotal.toFixed(2)} €</span>
    </div>
  `;
  container.appendChild(summary);
}
