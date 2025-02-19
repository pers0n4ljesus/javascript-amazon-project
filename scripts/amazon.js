import {addToCart, cart, updateCartQuantity} from "../scripts/cart.js";
import {products} from "../data/products.js";
import { formatMoney } from "./utils/money.js";
let productsHTML = '';

updateCartQuantity('.js-cart-quantity');

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatMoney(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;
})

document.querySelector(('.js-product-grid'))
  .innerHTML = productsHTML;


//Code for adding an item to cart
document.querySelectorAll('.js-add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {

      const {productId} = button.dataset;

      addToCart(productId);
      updateCart(productId);
      
    });
  });

function updateCart(productId) {
  const messageElement = document.querySelector(`.js-added-to-cart${productId}`);

  messageElement.classList.add('opacity-full');
  let intervalId;
  if (intervalId) clearTimeout(intervalId);
  intervalId = setTimeout(() => {
    messageElement.classList.remove('opacity-full')
  }, 1000);

  updateCartQuantity('.js-cart-quantity');
}

updateCartQuantity('.js-cart-quantity');





