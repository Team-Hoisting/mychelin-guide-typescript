import React from 'react';
import styled from 'styled-components';
import { BiErrorCircle } from 'react-icons/bi';
import { Alert } from '@mantine/core';

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

const Text = styled.span`
  padding: 0 2rem;
  color: white;
`;

const color = {
  success: 'blue',
  warning: 'orange',
  error: 'red',
};

const Toast = ({ text, type = 'error', closeHandler = () => {}, delay = 2000 }) => {
  React.useEffect(() => {
    setTimeout(closeHandler, delay);

    // return () => clearTimeout(timerId);
  }, []);

  return (
    <Container>
      <Alert
        icon={<BiErrorCircle size="1rem" />}
        color={color[type]}
        variant="filled"
        radius="md"
        styles={() => ({
          root: {
            // border: '1px solid #d21312',
          },
        })}>
        <Text>{text}</Text>
      </Alert>
    </Container>
  );
};

export default Toast;
