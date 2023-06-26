import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { categoryInfo } from '../../constants';

const jump = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.01);
  }
`;

const animation = css`
  animation: ${jump} 0.4s infinite alternate;
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  height: 360px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  transition: 0.1s ease-in;
  background-color: var(--bg-color);
  color: var(--font-color);
  border-radius: 5px;
  border: 2px solid var(--border-secondary);
  position: relative;

  :hover {
    scale: 1.01;
  }

  ${props => props.isEditing && animation}
`;

const NonImageContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  height: 20%;
`;

const CategoryTitle = styled.div`
  flex: 1;
  display: flex;
  padding: 10px;
`;

const CategoryIcon = styled.img`
  width: 30px;
`;

const CategoryName = styled.p`
  margin: auto 10px;
  font-size: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 80%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const StoreName = styled.p`
  flex: 2;
  margin: 0;
  font-weight: 500;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 65%;
  white-space: nowrap;
  word-wrap: normal;
`;

const Overlay = styled.div`
  display: ${({ isOverlaid }) => (isOverlaid ? 'block' : 'none')};
  position: absolute;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ProfileStoreItem = ({ categoryCode, storeId, storeName, isEditing = false, isOverlaid = false }) => (
  <Container isEditing={isEditing}>
    <Link to={`/store/${storeId}`}>
      <ImageContainer>
        <Img
          src={`/img/stores/${storeId}`}
          onError={e => {
            e.target.src = '/img/default/store.png';
          }}
        />
      </ImageContainer>
    </Link>
    <NonImageContents>
      {categoryCode && (
        <CategoryTitle>
          <CategoryIcon src={`/categoryIcons/${categoryInfo[categoryCode].imgFile}.png`} />
          <CategoryName>{categoryInfo[categoryCode].ko}</CategoryName>
        </CategoryTitle>
      )}
      <StoreName>{storeName}</StoreName>
    </NonImageContents>
    <Overlay isOverlaid={isOverlaid} />
  </Container>
);

export default ProfileStoreItem;
