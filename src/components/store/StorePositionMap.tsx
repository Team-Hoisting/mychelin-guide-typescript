import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const { kakao } = window as any;

const StorePositionMap = ({ x, y }: { x: string | undefined; y: string | undefined }) => {
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

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default StorePositionMap;
