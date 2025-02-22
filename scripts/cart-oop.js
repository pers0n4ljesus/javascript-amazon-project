import { renderPaymentSummary } from "./checkout/paymentSummary.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
    loadFromStorage () {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryId: '2'
    }
    ];
    },
  
    addToCart (productId) {
      let isAlreadyInCart;
      let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(quantitySelector ? quantitySelector.value : 1);
      this.cartItems.forEach((item) => {
        if ( item.productId === productId ) {
          isAlreadyInCart = item;
        }
      });
    
      if (isAlreadyInCart) {
        isAlreadyInCart.quantity+= quantity;
      } else {
        this.cartItems.push(
          {
            productId,
            quantity: quantity,
            deliveryId: '1'
          }
        );
      }
      this.saveToStorage();
    },
  
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    
    
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
      this.saveToStorage();
      renderPaymentSummary();
    },
    
    getProductQuantity(productId) {
      let productQuantity = 1;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          productQuantity = cartItem.quantity;
          return;
        }
      })
      return productQuantity;
    },
  
    updateCartQuantity(jsClass, tailing) {
      let cartQuantity = 0;
      this.cartItems.forEach((item) => {
        cartQuantity+=item.quantity;
      });
    
      let text;
      if (tailing) {
        text = `${cartQuantity} ${tailing}`
      } else text = `${cartQuantity}`;
    
      document.querySelector(jsClass)
      .innerHTML = text;
    }
  };
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');




cart.loadFromStorage();
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);











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