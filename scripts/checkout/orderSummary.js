import { cart, getOrderValue, getTotalCartQuantity, updateCartQuantity } from "../../scripts/cart.js";
import { formatMoney } from "../utils/money.js";

export function renderOrderSummary() {
  let html = 
    `
      <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${getTotalCartQuantity()}):</div>
            <div class="payment-summary-money">${getOrderValue()}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;

  document.querySelector('.js-payment-summary')
    .innerHTML = html;
    console.log('What');
}

