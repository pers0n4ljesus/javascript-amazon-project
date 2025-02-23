import {addToCart, cart, loadFromStorage} from '../../data/cart.js'

describe('Test Suite: Add to Cart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
    spyOn(document, 'querySelector').and.returnValue({ value: '1' });
    loadFromStorage();


  })
  it('adds an existing product to the cart', () => {

    cart.length = 0;
    cart.push({
      productId: productId1,
      quantity: 2,
      deliveryId: '1'
    },
    {
      productId: productId2,
      quantity: 1,
      deliveryId: '2'
    }
    );

    addToCart(productId1);
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(3);

  });

  it('add a new product to the cart', () => {
    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
  });
});