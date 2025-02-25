import { loadProductsFetch, products } from '../data/products.js';
import { formatDate } from '../data/deliveryOptions.js';
import { orders } from '../scripts/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from '../data/cart.js';
import { searchFor } from './amazon.js';

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

renderTrackingPage();
updateCartQuantity('.js-cart-quantity');

async function renderTrackingPage() {


  // Find the product in the product list
  await loadProductsFetch();
  const matchingProduct = products.find(product => product.id === productId);
  
  // Find the order by orderId
  const order = orders.find(order => order.id === orderId);

  // Find the product inside the order
  const orderProduct = order?.products.find(product => product.productId === productId);

  // Extract estimated delivery time
  const estimatedDeliveryTime = orderProduct?.estimatedDeliveryTime;

  const elapsedTime = dayjs().diff(dayjs(order.orderTime), 'millisecond');
  const totalDeliveryTime = dayjs(estimatedDeliveryTime).diff(dayjs(order.orderTime), 'millisecond');
  const deliveryProgress = (elapsedTime / totalDeliveryTime) * 100;




  if (!matchingProduct) {
    console.warn(`Product not found for ID: ${productId}`);
    return;
  }

  if (!orderProduct) {
    console.warn(`Product with ID: ${productId} not found in order ${orderId}`);
    return;
  }

  let html = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formatDate(estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label js-preparing">
            Preparing
          </div>
          <div class="progress-label js-shipped">
            Shipped
          </div>
          <div class="progress-label js-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${deliveryProgress}%"></div>
        </div>
      </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = html;

  if (deliveryProgress <= 49 ) {
    document.querySelector('.js-preparing').classList.add('current-status');
  } else if (deliveryProgress < 100 ) {
    document.querySelector('.js-shipped').classList.add('current-status');
  } else document.querySelector('.js-delivered').classList.add('current-status');
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('.js-search-button')) {
    searchFor();
  }
})
