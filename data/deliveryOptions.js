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