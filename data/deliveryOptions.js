import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryWindow: 7,
    deliveryChargeCents: 0
  },
  {
    id: '2',
    deliveryWindow: 3,
    deliveryChargeCents: 499
  },
  {
    id: '3',
    deliveryWindow: 1,
    deliveryChargeCents: 999
  }
];

export function getDeliveryCharge(deliveryId) {
  let deliveryChargeCents;
    deliveryOptions.forEach((option) => {
      if (deliveryId === option.id) {
        deliveryChargeCents = option.deliveryChargeCents;
      }
    })
    return deliveryChargeCents;
}

// To calculate Delivery date
export function calculateDeliveryDate(deliveryWindow) {
  let deliveryDate = dayjs().add(deliveryWindow, 'days');
  if (deliveryDate.format('dddd') === 'Saturday') {
    deliveryDate = dayjs().add(2+deliveryWindow, 'days');
  } else if (deliveryDate.format('dddd') === 'Sunday') {
    deliveryDate = dayjs().add(1+deliveryWindow, 'days');
  }
  return deliveryDate.format('dddd, MMMM D');
}


// To get delivery window
export function getDeliveryWindow(cartItem) {
  let deliveryWindow;
  deliveryOptions.forEach((option) => {
    if ( option.id === cartItem.deliveryId) deliveryWindow = option.deliveryWindow
  })
  return deliveryWindow;
}