import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Divider } from '@mantine/core';
import { AiOutlineClose } from 'react-icons/ai';
import userState from '../../recoil/atoms/userState';

const Comment = styled.div`
  position: relative;
  margin: 18px 0;
  padding: 4px 0;
  display: flex;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
  cursor: pointer;
`;

const CloseBtn = styled(AiOutlineClose)`
  position: absolute;
  top: 10%;
  right: 0;
  width: 20px;
  height: 20px;
  color: var(--font-color);
  cursor: pointer;
`;

const Content = styled.p`
  padding: 0 8px;
  margin: 4px 0;
`;

const CertifiedIcon = styled.img.attrs({
  src: '/images/certified.png',
})`
  width: 20px;
  margin: 4px;
`;

const NickName = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0 4px;
`;

const Comments = ({ commentData, deleteComment, hasBorder }) => {
  const { nickname, isCertified, content, email, commentId } = commentData;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const handleDeleteBtnClick = commentId => () => {
    deleteComment(commentId);
  };

  const handleProfileClick = nickname => () => {
    navigate(`/profile/${nickname}`, { state: pathname });
  };

  return (
    <>
      <Comment>
        <Profile
          src={`/img/users/${commentData?.nickname}`}
          onClick={handleProfileClick(nickname)}
          onError={e => {
            e.target.src = '/img/default/user.png';
          }}
        />
        <div>
          <User>
            <NickName>{nickname}</NickName>
            {isCertified && <CertifiedIcon />}
          </User>
          <Content>{content}</Content>
        </div>
        {user && email === user.email && <CloseBtn onClick={handleDeleteBtnClick(commentId)} />}
      </Comment>
      {hasBorder && <Divider />}
    </>
  );
};

export default Comments;
