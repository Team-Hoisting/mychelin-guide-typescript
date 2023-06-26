import React from 'react';

const { kakao } = window;

const useMarkeredMap = markerClickHandler => {
  const mapRef = React.useRef(null);
  const mapContainerRef = React.useRef(null);
  const initialMarker = React.useRef(null);
  const markersRef = React.useRef([]);

  React.useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new kakao.maps.Map(mapContainerRef.current, {
      center: new kakao.maps.LatLng(37.49554428487904, 127.0292884713586),
      level: 3,
    });

    const successGeolocation = position => {
      const { latitude, longitude } = position.coords;
      const currentLatLng = new kakao.maps.LatLng(latitude, longitude);

      initialMarker.current = new kakao.maps.Marker({
        map: mapRef.current,
        position: currentLatLng,
        image: new kakao.maps.MarkerImage(`/images/marker.png`, new kakao.maps.Size(45, 45)),
      });

      mapRef.current.setCenter(currentLatLng);
    };

    const errorGeolocation = () => {};

    if ('geolocation' in navigator) navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
  }, []);

  const drawMarkers = (markerInfos = []) => {
    if (initialMarker.current) initialMarker.current.setMap(null);
    markersRef.current.forEach(({ marker, infowindow }) => {
      marker.setMap(null);
      infowindow?.close();
    });

    markersRef.current = [];

    if (markerInfos.length === 0) return;

    const bounds = new kakao.maps.LatLngBounds();

    markerInfos.forEach(({ store, isRegistered }, idx) => {
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(store.y, store.x),
        image: new kakao.maps.MarkerImage(
          `/images/marker${isRegistered ? '' : '_nocolor'}.png`,
          new kakao.maps.Size(45, 45)
        ),
        zIndex: markerInfos.length - idx,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        markerClickHandler(idx);
      });

      const infowindow = new kakao.maps.InfoWindow({
        zIndex: markerInfos.length - idx,
      });

      infowindow.setContent(
        `<div style="
          padding: 5px 10px;
          overflow: hidden;
          white-space: nowrap;
          font-size: 15px;
          color: #353535;"><span style="color: var(--primary-color);">${String.fromCharCode(idx + 65)}. </span>${
          store.place_name
        }</div>`
      );

      infowindow.open(mapRef.current, marker);

      markersRef.current = [...markersRef.current, { marker, infowindow }];

      bounds.extend(new kakao.maps.LatLng(store.y, store.x));
    });

    mapRef.current.setBounds(bounds, 60, 60, 60, 60);
  };

  return { mapContainerRef, drawMarkers };
};

export default useMarkeredMap;
