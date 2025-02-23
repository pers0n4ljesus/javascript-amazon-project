import { cart } from "../../data/cart.js";
import { getMatchingProduct } from "../../data/products.js";
import { formatMoney } from "../utils/money.js";
import { getDeliveryCharge } from "../../data/deliveryOptions.js";
import { addOrder } from "../orders.js";


export function renderPaymentSummary() {
  let html = 
    `
      <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${getTotalCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatMoney(getOrderValueCents())}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatMoney(getShippingChargeCents())}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatMoney(totalBeforeTaxCents())}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatMoney(totalBeforeTaxCents()*0.1)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatMoney(totalBeforeTaxCents()+(totalBeforeTaxCents()*0.1))}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
        </div>
    `;

  document.querySelector('.js-payment-summary')
    .innerHTML = html;

  const placeOrderButton = document.querySelector('.js-place-order-button');
  placeOrderButton.replaceWith(placeOrderButton.cloneNode(true));
    

  document.querySelector('.js-place-order-button')
  .addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ cart })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const order = await response.json();
      localStorage.setItem('latestOrder', JSON.stringify(order));
      cart.length = 0;
      localStorage.removeItem('cart');


      console.log('Order Response:', order); // 🔍 Debugging output
      addOrder(order);

      // Redirect only if everything is successful
      window.location.href = "orders.html";

    } catch (error) {
      console.error('Unexpected error! Try again later.', error);
    }
  });
}


function getTotalCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity+=item.quantity;
  });
  return cartQuantity;
}

function getOrderValueCents() {
  let orderValue = 0;
  cart.forEach((cartItem) => {
    const matchingProduct = getMatchingProduct(cartItem);
    orderValue += (cartItem.quantity * matchingProduct.priceCents)
  })
  return orderValue;
}

function getShippingChargeCents() {
  let shippingCharge = 0;
  cart.forEach((cartItem) => {
    shippingCharge += getDeliveryCharge(cartItem.deliveryId);
  })
  return shippingCharge;
}

function totalBeforeTaxCents() {
  return getShippingChargeCents() + getOrderValueCents();
}
