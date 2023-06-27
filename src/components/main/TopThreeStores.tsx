import React from 'react';
import styled from 'styled-components';
import { StoreItem } from '.';
import { StoresDataType } from 'types';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

interface TopThreeStoresProps {
  stores: StoresDataType | undefined;
}

const TopThreeStores = ({ stores }: TopThreeStoresProps) => (
  <Container>
    {stores?.map((store, idx) => (
      <StoreItem key={store.storeId} place={idx + 1} store={store} />
    ))}
  </Container>
);

export default TopThreeStores;
