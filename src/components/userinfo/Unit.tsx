import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import Button from './Button';
import Editor from './Editor';

const Container = styled.div`
  padding: 25px 0 18px 0;
  position: relative;
  color: var(--font-color);
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.07px;
`;

const Content = styled.div`
  padding-top: 6px;
  font-size: 1rem;
  letter-spacing: -0.16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonWithPosition = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 16px;
`;

const Unit = ({ type, title, formSchema, defaultValues }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const user = useRecoilValue(userState);

  return (
    <Container>
      <Title>{title}</Title>
      {!isOpen ? (
        <>
          <Content>{type === 'nickname' ? user?.nickname : '●●●●●●●●●'}</Content>
          <ButtonWithPosition onClick={() => setIsOpen(true)}>변경</ButtonWithPosition>
        </>
      ) : (
        <Editor type={type} onClose={() => setIsOpen(false)} formSchema={formSchema} defaultValues={defaultValues} /> // form
      )}
    </Container>
  );
};

export default Unit;
