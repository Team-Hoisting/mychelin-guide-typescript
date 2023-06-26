import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { Button } from '@mantine/core';

const Container = styled.main`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i,700');

  $bg: #313942;
  $ghost: #528cce;
  $heading: #e7ebf2;

  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  text-align: center;

  h1 {
    font-size: 12.5rem;
    letter-spacing: 0.1em;
    margin: 0.025em 0;
    text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
    white-space: nowrap;

    @media (max-width: 30rem) {
      font-size: 8.5rem;
    }

    & > span {
      animation: spooky 2s alternate infinite linear;
      color: #deb887;
      display: inline-block;
    }
  }

  h2 {
    margin-bottom: 0.4em;
  }

  p {
    color: #ccc;
    margin-top: 0;
  }

  @keyframes spooky {
    from {
      transform: translatey(0.15em) scaley(0.95);
    }

    to {
      transform: translatey(-0.15em);
    }
  }
`;

const Error = () => (
  <Container>
    <h1>
      4
      <span>
        <FontAwesomeIcon icon={faCookie} />
      </span>
      4
    </h1>
    <h2>Error: 404 page not found</h2>
    <p>Sorry, the page you are looking for cannot be accessed</p>
    <Link to="/">
      <Button>Go Back</Button>
    </Link>
  </Container>
);

export default Error;
