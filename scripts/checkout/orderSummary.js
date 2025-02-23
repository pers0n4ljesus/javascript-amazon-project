import { getMatchingProduct, products } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { formatMoney } from "../utils/money.js";
import { getDeliveryWindow, calculateDeliveryDate, deliveryOptions } from "../../data/deliveryOptions.js";

export function renderOrderSummary() {
  let cartHTML = '';
  cart.forEach((cartItem) => {
    let matchingProduct = getMatchingProduct(cartItem);
    const deliveryWindow = getDeliveryWindow(cartItem);
    cartHTML+= `
              <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
              <div class="delivery-date">
                Delivery date: ${calculateDeliveryDate(deliveryWindow)}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image || '../images/amazon-logo.png'}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${matchingProduct.getPriceCents()}
                  </div>
                  <div class="product-quantity js-product-quantity-${cartItem.productId}">
                    <span>
                      Quantity: <span class="quantity-label 
                      js-quantity-label-${cartItem.productId}">
                        ${cartItem.quantity}
                      </span>
                    </span>
                    <span class="update-quantity-link link-primary
                    js-update-quantity-link"
                    data-update-link = "${cartItem.productId}">
                      Update
                    </span>
                    <span class="js-update-quantity-container-${cartItem.productId} update-quantity-container"
                    data-save-link = "${cartItem.productId}">
                      <input class="quantity-input js-quantity-input-${cartItem.productId}">
                      <span class="save-quantity-link js-save-quantity-link link-primary"
                      data-save-link = "${cartItem.productId}">
                        Save
                      </span>
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link js-test-delete-quantity-link-${cartItem.productId}"
                    data-delete-link = "${cartItem.productId}" >
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="js-delivery-options-container">
                  ${renderDeliveryOptions(cartItem)}
                  </div>
                </div>
              </div>
            </div>
    `;
  })

//Code to generat order summary
document.querySelector('.js-order-summary')
.innerHTML = cartHTML;
}

// To return a html string with available delivery options
function renderDeliveryOptions(cartItem) {
  let html = '';

  deliveryOptions.forEach((option) => {
    html+= `
      <div class="delivery-option">
                  <input type="radio"
                    ${cartItem.deliveryId === option.id 
                      ? 'checked' 
                      : ''}
                    class="delivery-option-input js-delivery-option-input"
                    name="delivery-option-${cartItem.productId}"
                    data-delivery-id=${option.id}
                    data-product-id=${cartItem.productId}>
                  <div>
                    <div class="delivery-option-date">
                      ${calculateDeliveryDate(option.deliveryWindow)}
                    </div>
                    <div class="delivery-option-price">
                      ${option.deliveryChargeCents === 0 ? 'Free -' : formatMoney(option.deliveryChargeCents)} Shipping
                    </div>
                  </div>
                </div>
    `;
  })
  return html;
}