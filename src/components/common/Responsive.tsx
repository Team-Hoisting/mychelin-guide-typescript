import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1300px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }) => <Container {...rest}>{children}</Container>;

export default Responsive;
