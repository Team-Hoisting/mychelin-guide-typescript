import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const { kakao } = window;

const StorePositionMap = ({ x, y }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const storePosition = new kakao.maps.LatLng(y, x);

    const map = new kakao.maps.Map(mapContainerRef.current, {
      center: storePosition,
      level: 3,
    });

    const marker = new kakao.maps.Marker({
      position: storePosition,
    });

    marker.setMap(map);
  }, [x, y]);

  return <Container ref={mapContainerRef} />;
};

export default StorePositionMap;
