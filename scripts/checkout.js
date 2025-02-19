import { cart, removeFromCart, updateCartQuantity } from "../scripts/cart.js";
import { products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";

updateCartQuantity('.js-checkout-quantity', 'items');

let cartHTML = '';
cart.forEach((cartItem) => {
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === cartItem.productId) {
      matchingProduct = product;
    }
  })
  cartHTML+= `
            <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatMoney(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link"
                  data-delete-link = "${cartItem.productId}" >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
})

//Code to generat order summary
document.querySelector('.js-order-summary')
  .innerHTML = cartHTML;

//Code to remove a product from cart
document.querySelectorAll('.js-delete-quantity-link')
  .forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const productId = deleteLink.dataset.deleteLink;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      updateCartQuantity('.js-checkout-quantity', 'items');

    });
  });




