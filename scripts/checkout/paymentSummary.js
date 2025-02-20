import { cart } from "../cart.js";
import { getMatchingProduct } from "../../data/products.js";
import { formatMoney } from "../utils/money.js";
import { getDeliveryCharge } from "../../data/deliveryOptions.js";

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

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;

  document.querySelector('.js-payment-summary')
    .innerHTML = html;
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