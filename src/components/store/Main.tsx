import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { StorePositionMap } from './index';
import { StoreDataType } from 'types';

const Container = styled.div`
  display: flex;
  height: 500px;
  min-width: 1000px;
`;

const DetailSide = styled.div`
  width: 37%;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 4px;
  background-color: var(--bg-secondary-color);
`;

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  border-radius: 4px;
`;

const InfoContainer = styled.div`
  position: absolute;
  top: 80%;
  left: 0;
  width: 100%;
  font-size: 14px;
  padding: 6px;
  border-radius: 4px;
`;

const Info = styled.div`
  padding: 0 4px;
`;

const info = css`
  span {
    font-weight: 700;
  }
`;

const AddressTitle = styled.p`
  ${info}
`;

const PhoneTitle = styled.p`
  ${info}
`;

const loading = keyframes`
  0% {
    transform: translateX(0);
  }

  50%,
  100% {
    transform: translateX(100%);
  }
`;

const ImageSkeleton = styled.div`
  width: 70%;
  height: 500px;
  margin-right: 24px;
  overflow: hidden;
  position: relative;
  background-color: #f2f2f2;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ccc, #f2f2f2);
    animation: ${loading} 2s infinite linear;
  }
`;

const Image = styled.img<{ isImgLoading: boolean }>`
  display: ${({ isImgLoading }) => (isImgLoading ? 'none' : 'block')};
  width: 70%;
  height: 500px;
  margin-right: 24px;
  border-radius: 4px;
  object-fit: cover;
`;

interface MainProps {
  store: StoreDataType | undefined;
}

const Main = ({ store }: MainProps) => {
  const [isImgLoading, setisImgLoading] = React.useState(true);

  const handleLoad = () => {
    setisImgLoading(false);
  };

  return (
    <Container>
      {isImgLoading && <ImageSkeleton />}
      <Image
        src={`/img/stores/${store?.storeId}`}
        isImgLoading={isImgLoading}
        draggable={false}
        onLoad={handleLoad}
        onError={e => {
          (e.target as HTMLImageElement).src = '/img/default/store.png';
        }}
      />
      <DetailSide>
        <MapContainer className="map">
          <StorePositionMap x={store?.x} y={store?.y} />
        </MapContainer>
        <InfoContainer>
          <Info>
            <AddressTitle>
              <span>주소</span> : {store?.address || '없음'}
            </AddressTitle>
            <PhoneTitle>
              <span>전화번호</span> : {store?.phoneNumber || '없음'}
            </PhoneTitle>
          </Info>
        </InfoContainer>
      </DetailSide>
    </Container>
  );
};

export default Main;
