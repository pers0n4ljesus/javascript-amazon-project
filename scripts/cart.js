export const cart = [];


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
}