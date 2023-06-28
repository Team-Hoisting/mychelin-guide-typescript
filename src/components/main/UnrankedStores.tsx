import styled from 'styled-components';
import { StoreItem } from '.';
import { StoresDataType } from 'types';

const Container = styled.div`
  margin-top: 20px;
  grid-gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

interface UnrankedStoresProps {
  stores?: StoresDataType;
}

const UnrankedStores = ({ stores }: UnrankedStoresProps) => (
  <Container>
    {stores?.map(store => (
      <StoreItem key={store.storeId} store={store} />
    ))}
  </Container>
);

export default UnrankedStores;
