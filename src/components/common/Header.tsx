import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BsMoon, BsSun } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState, searchInputState, categoryState, themeState } from '../../recoil/atoms';
import { logout } from '../../api/auth';
import { SearchBar } from './index';
import { useOnClickOutside } from '../../hooks/index.js';
import { User } from 'types';
import { AxiosError } from 'axios';

const Header = () => {
  const [user, setUser] = useRecoilState<User | null>(userState);
  const setSearchInput = useSetRecoilState(searchInputState);
  const setCategoryState = useSetRecoilState(categoryState);
  const [theme, setTheme] = useRecoilState(themeState);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const searchBarRef = React.useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

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
  const userDropdownRef = useOnClickOutside(() => setOpenDropdown(false));

  return (
    <>
      <Container>
        <Wrapper hasSearchBar={hasSearchBar}>
          <Link to="/" onClick={resetMainPage}>
            <LogoImage
              src={`/images/mychelin-guide-logo-${theme}.png`}
              alt="마이슐랭 가이드 로고"
            />
          </Link>
          {hasSearchBar ? <SearchBar hasDropdown={true} inputRef={searchBarRef} /> : <></>}
          <ConfigsContainer>
            <Link to="/searchmap">
              <RegisterButton>당신만의 맛집을 알려주세요</RegisterButton>
            </Link>
            {theme === 'dark' ? <LightModeIcon onClick={toggleTheme} /> : <DarkModeIcon onClick={toggleTheme} />}
            <UserIconWrapper
              onClick={e => {
                e.stopPropagation();

                if (user) setOpenDropdown(!openDropdown);
                else navigate('/signin', { state: pathname });
              }}>
              {!user ? (
                <UserIcon />
              ) : (
                <UserImage
                  src={`/img/users/${user.nickname}`}
                  onError={e => {
                    if (e.target instanceof HTMLImageElement) e.target.src = '/img/default/user.png';
                  }}
                />
              )}
            </UserIconWrapper>
            <UserDropdown opened={openDropdown} ref={userDropdownRef}>
              <Link to={`/profile/${user?.nickname}`}>
                <DropdownButton onClick={() => setOpenDropdown(false)}>마이페이지</DropdownButton>
              </Link>
              <Link to="/info">
                <DropdownButton onClick={() => setOpenDropdown(false)}>회원정보 수정</DropdownButton>
              </Link>
              <Link to="/searchmap">
                <DropdownButton onClick={() => setOpenDropdown(false)}>맛집 등록</DropdownButton>
              </Link>
              <SignoutButton
                onClick={async () => {
                  try {
                    await logout();

                    setUser(null);
                    setOpenDropdown(false);

                    toast.success('로그아웃 되었습니다.');
                    navigate('/');
                  } catch (e) {
                    if (e instanceof AxiosError) throw new Error(e.message);
                  }
                }}>
                Sign Out
              </SignoutButton>
            </UserDropdown>
          </ConfigsContainer>
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

const UserIconWrapper = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  object-fit: cover;
`;

const UserIcon = styled(FaRegUser)`
  font-size: 18px;
  color: var(--font-color);
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid var(--border-primary);
`;

const ConfigsContainer = styled.div`
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

interface UserDropdownProps {
  opened: boolean;
}

const UserDropdown = styled.nav<UserDropdownProps>`
  display: ${({ opened }) => (opened ? 'block' : 'none')};
  border: 1px solid #ababab;
  border-radius: 5px;
  position: absolute;
  padding: 5px;
  min-height: 10rem;
  width: 12rem;
  top: 105%;

  color: var(--font-color);
  background-color: var(--bg-color);
`;

const DropdownButton = styled.div`
  font-style: normal;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;

  :hover {
    background-color: var(--button-hover-color);
  }
`;

const SignoutButton = styled(DropdownButton)`
  border-top: 1px solid #e0e0e0;
`;

const SpaceFiller = styled.div`
  height: 4rem;
`;

export default Header;
