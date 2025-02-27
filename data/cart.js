import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

export let cart;

loadFromStorage();

export function loadFromStorage () {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}


export function addToCart (productId) {
  let isAlreadyInCart;
  const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = quantityElement ? Number(quantityElement.value) : 1;
  cart.forEach((item) => {
    if ( item.productId === productId ) {
      isAlreadyInCart = item;
    }
  });

  if (isAlreadyInCart) {
    isAlreadyInCart.quantity+= quantity;
  } else {
    cart.push(
      {
        productId,
        quantity: quantity,
        deliveryId: '1'
      }
    );
  }
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
  renderPaymentSummary();
}

export function getProductQuantity(productId) {
  let productQuantity = 1;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      productQuantity = cartItem.quantity;
      return;
    }
  })
  return productQuantity;
}


export function updateCartQuantity(jsClass, tailing) {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity+=item.quantity;
  });

  let text;
  if (tailing) {
    text = `${cartQuantity} ${tailing}`
  } else text = `${cartQuantity}`;

  document.querySelector(jsClass)
  .innerHTML = text;
}

export function loadCartFetch() {
  fetch('https://supersimplebackend.dev/cart').then((response) => {
    return response;
  })
}
export async function loadCart() {
  try {
    await fetch('https://supersimplebackend.dev/cart').then((response) => {
      console.log(response.text)
    });
  } catch (error) {
  }
  
}
/*
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    fun();
  });
  
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}
*/

/*
Code for generating  dynamic loading of value in quantity selector
<div class="product-quantity-container">
  <select class="js-quantity-selector-${product.id}">
    ${[...Array(10)].map((_, i) => {
      const value = i + 1;
      return `<option value="${value}" ${getProductQuantity(product.id) === value ? 'selected' : ''}>${value}</option>`;
    }).join('')}
  </select>
</div>
*/