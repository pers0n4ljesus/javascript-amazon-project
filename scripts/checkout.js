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
                  <span class="js-update-quantity-container-${cartItem.productId} update-quantity-container">
                    <input class="quantity-input js-quantity-input-${cartItem.productId}">
                    <span class="save-quantity-link js-save-quantity-link link-primary"
                    data-save-link = "${cartItem.productId}">
                      Save
                    </span>
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


// My approcah to excercise 14g
/*
document.querySelectorAll('.js-update-quantity-link')
  .forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      const productId = updateLink.dataset.updateLink;
      document.querySelector(`.js-update-quantity-container-${productId}`).
        innerHTML = `
          <input class="quantity-input">
          <span class="save-quantity-link link-primary">Save</span>
        `
    })
  })
*/


// To display input field when update is clicked
document.querySelectorAll('.js-update-quantity-link')
  .forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      const productId = updateLink.dataset.updateLink;
      const displayElement = document.querySelector(`.js-update-quantity-container-${productId}`);
      if (displayElement.classList.contains('renderElement')) {
        displayElement.classList.remove('renderElement');
      } else displayElement.classList.add('renderElement');
    })
  })


// To remove input field and save button after it is clicked
document.querySelectorAll('.js-save-quantity-link')
  .forEach((saveLink) => {
    const productId = saveLink.dataset.saveLink;

    saveLink.addEventListener('click', () => {
      const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
      const newProductQuantity = Number(inputElement.value);
      updateQuantityInCart(newProductQuantity, productId);
    })
    
    document.addEventListener('keydown', (event) => {
      const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
      if (event.key === 'Enter') {
        const newProductQuantity = Number(inputElement.value);
        updateQuantityInCart(newProductQuantity, productId);
      }

    })
  })

function updateQuantityInCart(newProductQuantity, productId) {
  document.querySelector(`.js-update-quantity-container-${productId}`)
  .classList.remove('renderElement');
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      if (newProductQuantity > 0 && newProductQuantity <= 10) {
        cartItem.quantity = newProductQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartQuantity('.js-checkout-quantity', 'items');
        document.querySelector(`.js-quantity-label-${productId}`)
        .innerHTML = newProductQuantity;
      }
    }
  })
}











