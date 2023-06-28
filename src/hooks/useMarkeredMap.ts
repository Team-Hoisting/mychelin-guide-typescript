import { ResultItemType } from 'components/searchmap/types';
import React from 'react';

const { kakao } = window as any;

type LatLngBounds = {};

type map = {
  setCenter: (latlng: latlng) => void;
  setBounds: (
    bounds: LatLngBounds,
    paddingTop: Number,
    paddingRight: Number,
    paddingBottom: Number,
    paddingLeft: Number
  ) => void;
};
type marker = {
  setMap: (map: map | null) => void;
};
type infowindow = {
  close: () => void;
};
type position = {
  coords: {
    latitude: number;
    longitude: number;
  };
};
type latlng = {};

const useMarkeredMap = (markerClickHandler: (idx: number) => void) => {
  const mapRef = React.useRef<map>();
  const mapContainerRef = React.useRef(null);
  const initialMarker = React.useRef<marker>();
  const markersRef = React.useRef<{ marker: marker; infowindow: infowindow }[]>([]);

  React.useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new kakao.maps.Map(mapContainerRef.current, {
      center: new kakao.maps.LatLng(37.49554428487904, 127.0292884713586),
      level: 3,
    });

    const successGeolocation = (position: position) => {
      const { latitude, longitude } = position.coords;
      const currentLatLng = new kakao.maps.LatLng(latitude, longitude);

      initialMarker.current = new kakao.maps.Marker({
        map: mapRef.current,
        position: currentLatLng,
        image: new kakao.maps.MarkerImage(`/images/marker.png`, new kakao.maps.Size(45, 45)),
      });

      mapRef.current?.setCenter(currentLatLng);
    };

    const errorGeolocation = () => {};

    if ('geolocation' in navigator) navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
  }, []);

  const drawMarkers = (markerInfos: Array<ResultItemType> | undefined) => {
    if (initialMarker.current) initialMarker.current.setMap(null);
    markersRef.current.forEach(({ marker, infowindow }) => {
      marker.setMap(null);
      infowindow?.close();
    });

    markersRef.current = [];

    if (markerInfos === undefined || markerInfos?.length === 0) return;

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

    mapRef.current?.setBounds(bounds, 60, 60, 60, 60);
  };

  return { mapContainerRef, drawMarkers };
};

export default useMarkeredMap;
