import React from 'react';
import styled from 'styled-components';
import ImageInfo from '../components/userinfo/ImageInfo';
import LoginInfo from '../components/userinfo/LoginInfo';

const Container = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 2rem;
  width: 1024px;
  margin: 0 auto;
  min-height: 100vh;

  button {
    background-color: var(--button-color);
    color: var(--font-color);
  }

  @media (max-width: 1024px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UserInfoPage = () => (
  <Container>
    <ImageInfo />
    <LoginInfo />
  </Container>
);

export default UserInfoPage;
