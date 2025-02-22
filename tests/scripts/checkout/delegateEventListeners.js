import { removeFromCart,updateCartQuantity } from "../../../scripts/cart.js";
import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../../../scripts/checkout/paymentSummary.js";


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