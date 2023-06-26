import React from 'react';
import styled from 'styled-components';
import { StoreItemOnNoHover, StoreItemOnHover } from '.';

const Container = styled.div`
  overflow: hidden;
  height: 360px;
  background-color: #fff;
  color: #22272e;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 30px;
  position: relative;
  transition: 0.1s ease-in-out;

  border: 2px solid var(--border-secondary);

  :hover {
    scale: 1.02;
  }

  :hover > main {
    transition: 0.1s ease-in-out;
    background-color: rgba(0, 0, 0, 0.8);

    div {
      display: flex;
    }

    img {
      display: block;
    }
  }

  :before {
    ${({ place }) =>
      place &&
      `
      content: '';
      position: absolute;
      z-index: 3;
      top: 5px;
      background-image: url('/medals/${place}-medal.png');
      background-size: 80px;
      background-repeat: no-repeat;
      width: 100px; 
      height: 200px;
    `}
  }
`;

const StoreItem = ({ store, place = null }) => {
  const { storeId, storeName, starCount = 0, voteCntArr = [] } = store;

  return (
    <Container place={place}>
      <StoreItemOnHover storeId={store.storeId} />
      <StoreItemOnNoHover storeId={storeId} storeName={storeName} starCount={starCount} voteCntArr={voteCntArr} />
    </Container>
  );
};

export default StoreItem;
