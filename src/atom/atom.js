import { atom } from 'recoil';

export const sizeState = atom({
  key: 'sizeState',
  default: {
    size: '',
    price: '',
  },
});

export const tradeState = atom({
  key: 'tradeState',
  default: {
    buy: {
      id: 0,
      size: '',
      price: 0,
      is_buyer: false,
    },
    sell: {
      id: 0,
      size: '',
      price: 0,
      is_seller: false,
    },
  },
});

export const subModal = atom({
  key: 'subModal',
  default: false,
});

export const modalName = atom({
  key: 'modalName',
  default: '',
});
