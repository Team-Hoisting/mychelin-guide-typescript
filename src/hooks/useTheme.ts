import React from 'react';
import { useRecoilState } from 'recoil';
import themeState from '../recoil/atoms/themeState';

const useTheme = () => {
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
