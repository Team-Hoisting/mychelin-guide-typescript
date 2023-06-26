import styled from 'styled-components';
import { Loader as LoaderComponent } from '@mantine/core';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => (
  <Container>
    <LoaderComponent color="red" variant="dots" size="xl" />
  </Container>
);

export default Loader;
