import React from 'react';
import styled from 'styled-components';
import { nicknameSchema, passwordSchema } from '../../schema';
import Unit from './Unit';

const Container = styled.div`
  padding-top: 38px;
  max-width: 480px;
  background-color: var(--bg-color);
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.3rem;
  letter-spacing: -0.27px;
`;

const defaultValuesForNickname = {
  nickname: '',
};

const defaultValuesForPassword = {
  password: '',
  confirmPassword: '',
};

const LoginInfo = () => (
  <Container>
    <Title>로그인 정보</Title>
    <Unit type="nickname" title="닉네임" formSchema={nicknameSchema} defaultValues={defaultValuesForNickname} />
    <Unit type="password" title="비밀번호" formSchema={passwordSchema} defaultValues={defaultValuesForPassword} />
  </Container>
);

export default LoginInfo;
