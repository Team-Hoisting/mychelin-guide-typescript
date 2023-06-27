import { atom, AtomEffect } from 'recoil';
import { User } from 'types';

const localStorageEffect =
  (key: string): AtomEffect<User | null> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const userState = atom<User | null>({
  key: 'userState',
  default: null,
  effects: [localStorageEffect('user')],
});

export default userState;
