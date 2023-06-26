import { atom } from 'recoil';

const categoryState = atom({
  key: 'categoryState',
  default: 'AL00',
});

export default categoryState;
