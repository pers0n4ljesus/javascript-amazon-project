import { getMatchingProduct } from "../data/products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
  deliveryId: '1'
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryId: '2'
}
];

export function addToCart (productId) {
  let isAlreadyInCart;
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
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
        quantity: quantity
      }
    );
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
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

export function getTotalCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity+=item.quantity;
  });
  return cartQuantity;
}

export function getOrderValue() {
  console.log(cart);
  let orderValue = 0;
  
  cart.forEach((cartItem) => {
    const matchingProduct = getMatchingProduct(cartItem);
    console.log(matchingProduct);
    orderValue += (cartItem.quantity * matchingProduct.priceCents)
  })
  return orderValue;
}

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