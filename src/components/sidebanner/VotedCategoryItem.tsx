import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import categoryInfo from '../../constants/categoryInfo';
import { CategoryCode } from 'types';

interface VotedCategoryItemProps {
  categoryCode: CategoryCode;
  storeId: string | undefined;
}

const VotedCategoryItem = ({ categoryCode, storeId }: VotedCategoryItemProps) => (
  <Container>
    {storeId ? (
      <Link to={`/store/${storeId}`}>
        <StoreImg
          src={`/img/stores/${storeId}`}
          onError={(e: SyntheticEvent<HTMLImageElement, ErrorEvent>) => {
            e.currentTarget.src = '/img/default/store.png';
          }}
        />
      </Link>
    ) : (
      <StoreImg src={`/categoryIcons/noColor/${categoryInfo[categoryCode].imgFile}.png`} />
    )}
    <CategoryName>{categoryInfo[categoryCode].ko}</CategoryName>
  </Container>
);

const Container = styled.div`
  margin: 15px auto;
  padding: 3px;
  height: 80px;
  border-radius: 10px;
`;

const StoreImg = styled.img`
  margin: auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  color: var(--font-color);
  object-fit: cover;
`;

const CategoryName = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 500;
`;

export default VotedCategoryItem;
