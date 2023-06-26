import styled from 'styled-components';
import { StoreItem } from '.';

const Container = styled.div`
  margin-top: 20px;
  grid-gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const UnrankedStores = ({ stores }) => (
  <Container>
    {stores.map(store => (
      <StoreItem key={store.storeId} store={store} />
    ))}
  </Container>
);

export default UnrankedStores;
