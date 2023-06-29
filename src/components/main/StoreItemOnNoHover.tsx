import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MychelinStars } from '.';
import { CategoryTag } from '../common';
import { CategoryCode } from 'types';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  height: 360px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 30px;
  position: relative;
  transition: 0.1s ease-in-out;
  color: var(--font-color);
`;

const ImageContainer = styled.div`
  width: 400px;
  height: 250px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Contents = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  height: 100%;
  font-weight: 500;
  font-size: 18px;
`;

const StoreInfoMain = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.p`
  padding: 8px 2px;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 70%;
  overflow: hidden;
`;

const VotesContainer = styled.div`
  display: flex;
  gap: 2px;
  overflow: hidden;
`;

const Placeholder = styled.div`
  background-color: inherit;
  height: 100px;
  width: 100px;
`;

interface StoreItemOnNoHoverProps {
  storeId: string;
  storeName: string;
  starCount: number;
  voteCntArr: [CategoryCode, number][];
}

const StoreItemOnNoHover = ({ storeId, storeName, starCount, voteCntArr }: StoreItemOnNoHoverProps) => (
  <Container>
    <Link to="/detail">
      <ImageContainer>
        <Img
          src={`img/stores/${storeId}`}
          onError={(e: SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = 'img/default/store.png';
          }}
        />
      </ImageContainer>
    </Link>
    <Contents>
      <StoreInfoMain>
        <Name>{storeName}</Name>
        <MychelinStars starCount={starCount} />
      </StoreInfoMain>
      <VotesContainer>
        {voteCntArr.length ? (
          voteCntArr.map((ctg, idx) => (
            <CategoryTag
              key={idx}
              categoryCode={Object.keys(ctg)[0]}
              votedCnt={Object.values(ctg)[0] as number}
              renderName={false}
            />
          ))
        ) : (
          <Placeholder />
        )}
      </VotesContainer>
    </Contents>
  </Container>
);

export default StoreItemOnNoHover;
