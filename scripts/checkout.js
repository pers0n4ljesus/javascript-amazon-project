import { cart, removeFromCart, updateCartQuantity } from "../scripts/cart.js";
import { getMatchingProduct, products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderOrderSummary } from "./checkout/orderSummary.js";

updateCartQuantity('.js-checkout-quantity', 'items');
renderOrderReview();
renderOrderSummary();

function renderOrderReview() {
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

document.querySelectorAll('.js-delivery-option-input')
.forEach((radioElement) => {
  radioElement.addEventListener('change', () => {
    let storeCartItem;
    cart.forEach((cartItem) => {
      if (cartItem.productId === radioElement.dataset.productId) {
        storeCartItem = cartItem;
        cartItem.deliveryId = radioElement.dataset.deliveryId;
        renderOrderReview();
        renderOrderSummary();
      }
    })
    localStorage.setItem('cart', JSON.stringify(cart));
  })
})
}




// To update product quantity in cart as per input
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
        renderOrderSummary();
      }
    }
  })
}


// To calculate Delivery date
function calculateDeliveryDate(deliveryWindow) {
  let deliveryDate = dayjs().add(deliveryWindow, 'days').format('dddd');
  if (deliveryDate === 'Saturday') {
    deliveryDate = dayjs().add(2+deliveryWindow, 'days').format('dddd, MMMM D');
  } else if (deliveryDate === 'Sunday') {
    deliveryDate = dayjs().add(1+deliveryWindow, 'days').format('dddd, MMMM D');
  } else deliveryDate = dayjs().add(deliveryWindow, 'days').format('dddd, MMMM D');
  return deliveryDate;
}

function getDeliveryWindow(cartItem) {
  let deliveryWindow;
  deliveryOptions.forEach((option) => {
    if ( option.id === cartItem.deliveryId) deliveryWindow = option.deliveryWindow
  })
  return deliveryWindow;
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




