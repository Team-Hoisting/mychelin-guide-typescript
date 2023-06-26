import { atom } from 'recoil';

const searchInputState = atom({
  key: 'searchInputState',
  default: '',
});

export default searchInputState;
