import React from 'react';
import { useRecoilState } from 'recoil';
import themeState from '../recoil/atoms/themeState';

// theme 변경할 때 toggleTheme 사용
const useTheme = () => {
  // const getInitialState = () => {
  //   let initialTheme = localStorage.getItem('theme');

  //   if (!initialTheme) {
  //     initialTheme = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  //     localStorage.setItem('theme', initialTheme);
  //   }

  //   return initialTheme;
  // };

  const [theme, setTheme] = useRecoilState(themeState);

  React.useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);
  };

  return [theme, toggleTheme];
};

export default useTheme;
