import { formatDate } from "../data/deliveryOptions.js";
import { addToCart, cart } from "../data/cart.js";
import { getMatchingProduct, loadProductsFetch, products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  localStorage.removeItem('orders');
  orders.unshift(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}

if (window.location.pathname.includes('orders.html')) {
  document.addEventListener("DOMContentLoaded", async () => {
    await loadProductsFetch();
    renderOrderList();
  });
}

export async function renderOrderList() {
  let html = '';
  
  for (const order of orders) {
    const productDetails = await renderOrderProducts(order.products, order.id);
    
    html += `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatMoney(order.totalCostCents)}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          <div class="order-details-grid">
            ${productDetails}
          </div>
        </div>
    `;
  }

  document.querySelector(".js-order-grid").innerHTML = html;
}

async function renderOrderProducts(orderProducts, orderId) {
  let html = '';
  
  for (const orderProduct of orderProducts) {
    const matchingProduct = products.find(product => product.id === orderProduct.productId);
    
    if (!matchingProduct) {
      console.warn(`Product not found for ID: ${orderProduct.productId}`);
      continue;
    }

    html += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${formatDate(orderProduct.estimatedDeliveryTime)}
        </div>
        <div class="product-quantity">
          Quantity: ${orderProduct.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again-button"
        data-product-id="${orderProduct.productId}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${orderId}&productId=${orderProduct.productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  }

  return html;
}

document.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('js-buy-again-button')) {
    const productId = target.dataset.productId;
    console.log(productId);
    addToCart(productId);
    window.location.href = 'checkout.html'; 

  }
});


