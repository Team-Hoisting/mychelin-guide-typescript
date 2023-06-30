import React from 'react';
import styled from 'styled-components';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchInputState, categoryState, themeState } from '../../recoil/atoms';
import { SearchBar } from './index';
import UserIcon from '../header/UserIcon';

const Header = () => {
  const setSearchInput = useSetRecoilState(searchInputState);
  const setCategoryState = useSetRecoilState(categoryState);
  const [theme, setTheme] = useRecoilState(themeState);
  const searchBarRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const resetMainPage = () => {
    setSearchInput('');
    if (searchBarRef.current) searchBarRef.current.value = '';
    setCategoryState('AL00');
  };

  const { pathname } = useLocation();
  const { id } = useParams();

  const hasSearchBar = pathname === '/' || pathname === `/store/${id}`;

  return (
    <>
      <Container>
        <Wrapper hasSearchBar={hasSearchBar}>
          <Link to="/" onClick={resetMainPage}>
            <LogoImage
              src={`/images/mychelin-guide-logo-${theme}.png`}
              alt="마이슐랭 가이드 로고"
              onClick={resetMainPage}
            />
          </Link>
          {hasSearchBar ? <SearchBar hasDropdown={true} inputRef={searchBarRef} /> : <></>}
          <Configs>
            <Link to="/searchmap">
              <RegisterButton>당신만의 맛집을 알려주세요</RegisterButton>
            </Link>
            {theme === 'dark' ? <LightModeIcon onClick={toggleTheme} /> : <DarkModeIcon onClick={toggleTheme} />}
            <UserIcon pathname={pathname} />
          </Configs>
        </Wrapper>
      </Container>
      <SpaceFiller />
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 10;
  background-color: var(--bg-secondary-color);
`;

interface WrapperProps {
  hasSearchBar: boolean;
}

// prettier-ignore
const Wrapper = styled.div<WrapperProps>`
  height: 4rem;
  min-width: 1024px;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1300px;
  margin: 0 auto;
  align-items: center;
  
  @media (max-width: 1024px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  ${({ hasSearchBar }) => hasSearchBar ? `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  ` : `
    display: flex;
    justify-content: space-between;
  `}

`;

const LogoImage = styled.img`
  width: 150px;
  height: 40px;
  cursor: pointer;
`;

const LightModeIcon = styled(BsSun)`
  font-size: 18px;
  color: #ffff00ea;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const DarkModeIcon = styled(BsMoon)`
  font-size: 18px;
  color: #3c3c3c;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const Configs = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  gap: 15px;
  padding-right: 5px;
  align-items: center;
  font-style: italic;
`;

const RegisterButton = styled.button`
  background: none;
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  color: var(--font-color);

  :hover {
    background-color: var(--button-hover-color);
  }
`;

const SpaceFiller = styled.div`
  height: 4rem;
`;

export default Header;
