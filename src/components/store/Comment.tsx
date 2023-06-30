import React from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Divider } from '@mantine/core';
import { AiOutlineClose } from 'react-icons/ai';
import userState from '../../recoil/atoms/userState';
import { CommentType } from 'hooks/useCommentsMutation';

interface CommentsProps {
  commentData: CommentType;
  deleteComment: (commentId: string) => void;
  hasBorder: boolean;
}

const Comments = ({ commentData, deleteComment, hasBorder }: CommentsProps) => {
  const { nickname, isCertified, content, email, commentId } = commentData;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const handleDeleteBtnClick = (commentId: string | undefined) => () => {
    if (commentId) deleteComment(commentId);
  };

  const handleProfileClick = (nickname: string) => () => {
    navigate(`/profile/${nickname}`, { state: pathname });
  };

  return (
    <>
      <Comment>
        <Profile
          src={`/img/users/${commentData?.nickname}`}
          onClick={handleProfileClick(nickname)}
          onError={e => {
            (e.target as HTMLImageElement).src = '/img/default/user.png';
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

export default Comments;
