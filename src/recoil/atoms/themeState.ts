import { atom } from 'recoil';

const getInitialState = () => {
  let initialTheme = localStorage.getItem('theme');

  if (!initialTheme) {
    initialTheme = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
    localStorage.setItem('theme', initialTheme);
  }

  return initialTheme;
};

const themeState = atom({
  key: 'themeState',
  default: getInitialState(),
});

export default themeState;
