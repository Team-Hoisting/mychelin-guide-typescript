import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MychelinStars } from '.';
import { CategoryTag } from '../common';
import { CategoryCode } from 'types';

interface StoreItemOnNoHoverProps {
  storeId: string;
  storeName: string;
  starsCount: number;
  votesCount: [CategoryCode, number][];
}

const StoreItemOnNoHover = ({ storeId, storeName, starsCount, votesCount }: StoreItemOnNoHoverProps) => {
  return (
    <Container>
      <Link to="/detail">
        <ImageContainer>
          <Img
            src={`img/stores/${storeId}`}
            onError={e => {
              e.currentTarget.src = 'img/default/store.png';
            }}
          />
        </ImageContainer>
      </Link>
      <Contents>
        <StoreInfoMain>
          <Name>{storeName}</Name>
          <MychelinStars starsCount={starsCount} />
        </StoreInfoMain>
        <VotesContainer>
          {votesCount.length ? (
            votesCount.map((category, idx) => (
              <CategoryTag
                key={idx}
                categoryCode={Object.keys(category)[0]}
                totalVotes={Object.values(category)[0] as number}
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
};

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

export default StoreItemOnNoHover;
