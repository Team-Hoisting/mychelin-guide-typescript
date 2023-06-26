import React from 'react';
import styled from 'styled-components';
import { StoreItem } from '.';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

const TopThreeStores = ({ stores }) => (
  <Container>
    {stores.map((store, idx) => (
      <StoreItem key={store.storeId} place={idx + 1} store={store} />
    ))}
  </Container>
);

export default TopThreeStores;
