import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import categoryInfo from '../../constants/categoryInfo';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const { kakao } = window;

const UserProfileMap = ({ voteStores }) => {
  const navigate = useNavigate();
  const mapContainerRef = React.useRef(null);
  const mapRef = React.useRef(null);

  useEffect(() => {
    mapRef.current = new kakao.maps.Map(mapContainerRef.current, {
      center: new kakao.maps.LatLng(37.497934, 127.027616),
    });

    const bounds = new kakao.maps.LatLngBounds();

    voteStores?.forEach(({ categoryCode, store }) => {
      const position = new kakao.maps.LatLng(store.y, store.x);
      const infowindow = new kakao.maps.InfoWindow();
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position,
        image: new kakao.maps.MarkerImage(`/images/pin.png`, new kakao.maps.Size(35, 35)),
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        navigate(`/store/${store.storeId}`);
      });

      infowindow.setContent(
        ` <div style="
          padding: 5px;
          font-size: 15px;
          color: #353535;"><span style="color: var(--primary-color);">${categoryInfo[categoryCode].ko}. </span>${store.storeName}</div>`
      );

      infowindow.open(mapRef.current, marker);

      bounds.extend(position);
    });

    mapRef.current.setBounds(bounds);
  });

  return <Container ref={mapContainerRef} />;
};

export default UserProfileMap;
