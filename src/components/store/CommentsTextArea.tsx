import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Button } from '../common/index';
import userState from '../../recoil/atoms/userState';
import { CommentType } from '../../hooks/useCommentsMutation';

const Container = styled.div`
  position: relative;
`;

const TextArea = styled.textarea.attrs(({ content }) => ({
  rows: 3,
  placeholder: '이 식당 어떠셨나요? 솔직한 후기를 알려주세요.',
  value: content,
}))`
  display: block;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border-radius: 12px;
  margin: 12px 0;
  resize: none;

  background-color: var(--bg-dark-color);
  color: var(--font-color);
  border: 2px solid var(--border-primary);

  :focus {
    border: 2px solid var(--border-primary);
    outline: none;
  }
`;

interface ButtonProps {
  $disabled: boolean;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CommentButton = styled(Button)<ButtonProps>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
  color: #eee;
  background: ${({ $disabled }) => $disabled && 'var(--button-disabled-color)'};

  :hover {
    background: 'var(--button-click-color);';
    color: #eee;
  }
`;

interface CommentsTextAreaProps {
  addComment: (newComment: CommentType) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CommentsTextArea = ({ addComment, setCurrentPage }: CommentsTextAreaProps) => {
  const [content, setContent] = React.useState('');
  const { storeId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleClick = () => {
    if (!content) return;

    if (!user) {
      navigate('/signin', { state: pathname });
      return;
    }

    const newComment = {
      storeId,
      content,
      email: user?.email,
      isCertified: true,
      nickname: user?.nickname,
    };

    addComment(newComment);
    setContent('');
    setCurrentPage(1);
  };

  return (
    <>
      <Container>
        <TextArea onChange={handleChange} content={content}></TextArea>
        <CommentButton onClick={handleClick} $disabled={!content.length}>
          등록하기
        </CommentButton>
      </Container>
    </>
  );
};

export default CommentsTextArea;
