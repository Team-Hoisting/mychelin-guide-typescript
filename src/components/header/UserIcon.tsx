import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { userState } from '../../recoil/atoms';
import { useOnClickOutside } from '../../hooks/index.js';
import { logout } from '../../api/auth';
import { User } from '../../types';

interface UserIconProps {
  pathname: string;
}

const UserIcon = ({ pathname }: UserIconProps) => {
  const [user, setUser] = useRecoilState<User | null>(userState);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const userDropdownRef = useOnClickOutside(() => setOpenDropdown(false));
  const navigate = useNavigate();

  const logCurrentUserOut = async () => {
    try {
      await logout();

      setUser(null);
      setOpenDropdown(false);
      toast.success('로그아웃 되었습니다.');
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) throw new Error(e.message);
    }
  };

  const onUserWrapperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (user) setOpenDropdown(!openDropdown);
    else navigate('/signin', { state: pathname });
  };

  return (
    <>
      <UserIconWrapper onClick={onUserWrapperClick}>
        {!user ? (
          <DefaultIcon />
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
        <SignoutButton onClick={logCurrentUserOut}>Sign Out</SignoutButton>
      </UserDropdown>
    </>
  );
};

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

const DefaultIcon = styled(FaRegUser)`
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

export default UserIcon;
