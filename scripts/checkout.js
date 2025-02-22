import { cart, loadCart, loadCartFetch, removeFromCart, updateCartQuantity } from "../scripts/cart.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProductsFetch } from "../data/products.js";

// import '../data/backend-practice.js';
renderPage();

async function renderPage () {
  await Promise.all([
    loadProductsFetch(),
    loadCart()
  ]);
  
  updateCartQuantity('.js-checkout-quantity', 'items');
  renderOrderSummary();
  renderPaymentSummary();
  delegateEventListeners();

}

/*
Promise.all([
  loadProductsFetch(),
  loadCartFetch()
]).then(() => {
  updateCartQuantity('.js-checkout-quantity', 'items');
  renderOrderSummary();
  renderPaymentSummary();
  delegateEventListeners();
});
*/


export function delegateEventListeners () {
document.body.addEventListener("click", (event) => {
  const target = event.target;

  // Delete product from cart
  if ( target.classList.contains('js-delete-quantity-link')) {
    console.log('clicked');
    const productId = target.dataset.deleteLink;
    removeFromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    updateCartQuantity('.js-checkout-quantity', 'items');
  }
  
  // To display input field when update is clicked
  if ( target.classList.contains('js-update-quantity-link')) {
    const productId = target.dataset.updateLink;
    const displayElement = document.querySelector(`.js-update-quantity-container-${productId}`);
    displayElement.classList.toggle('renderElement');
  }

  // To remove input field and save button after it is clicked
  if ( target.classList.contains('js-save-quantity-link')) {
    const productId = target.dataset.saveLink;
    const newProductQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    updateQuantityInCart(newProductQuantity, productId);
    const displayElement = document.querySelector(`.js-update-quantity-container-${productId}`);
    displayElement.classList.toggle('renderElement');
  }
});

// Handle Enter keypress for quantity update
document.body.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    const inputElement = document.activeElement;
    if (inputElement.classList.contains('quantity-input')) {
      const productId = inputElement.closest('.update-quantity-container').dataset.saveLink;
      const newProductQuantity = Number(inputElement.value);
      updateQuantityInCart(newProductQuantity, productId);
      const displayElement = document.querySelector(`.js-update-quantity-container-${productId}`);
      displayElement.classList.toggle('renderElement');
    }
  }
});

// Event delegation for delivery option selection
document.body.addEventListener("change", (event) => {
  if (event.target.classList.contains('js-delivery-option-input')) {
    const radioElement = event.target;
    const productId = radioElement.dataset.productId;
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.deliveryId = radioElement.dataset.deliveryId;
        renderOrderSummary();
        renderPaymentSummary();
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
});
}


// To update product quantity in cart as per input
function updateQuantityInCart(newProductQuantity, productId) {
  const updateContainer = document.querySelector(`.js-update-quantity-container-${productId}`);

  // Ensure vaild quantity input
  if (isNaN(newProductQuantity) || newProductQuantity <=0 || newProductQuantity > 10) {
    return;
  }

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newProductQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartQuantity('.js-checkout-quantity', 'items');
      document.querySelector(`.js-quantity-label-${productId}`)
      .innerHTML = newProductQuantity;
      renderPaymentSummary();
    }
  })
}








