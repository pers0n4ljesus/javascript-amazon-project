import { loadProducts } from '../../../data/products.js';
import { cart, removeFromCart, loadFromStorage} from '../../../scripts/cart.js';
import { renderOrderSummary } from '../../../scripts/checkout/orderSummary.js';  
import { delegateEventListeners } from './delegateEventListeners.js';

describe('Test Suite: Render Order Summary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  beforeAll((done) => {
    loadProducts(() => {
      done();
    })
  })

  beforeEach(() => {
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryId: '2'
        }
      ]));
      loadFromStorage();
      document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-checkout-quantity"></div>
      `;
      renderOrderSummary();
      delegateEventListeners();
      })

      afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
      })

  it('Renders cart', () => {
    expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
  })

  it('Deletes a product frrom cart', () => {
    document.querySelector(`.js-test-delete-quantity-link-${productId2}`).click();
    console.log(cart);

    expect(document.querySelectorAll('.cart-item-container').length).toEqual(1);
  })
})