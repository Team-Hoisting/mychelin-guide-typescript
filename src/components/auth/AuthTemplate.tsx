import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: var(--bg-color);
`;

const WhiteArea = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem 5rem;
  width: 500px;
  border-radius: 2px;
  margin-top: 1rem;

  background-color: var(--bg-dark-color);
`;

const AuthTemplate = ({ children }) => (
  <Container>
    <WhiteArea>{children}</WhiteArea>
  </Container>
);

export default AuthTemplate;
