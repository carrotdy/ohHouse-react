import React, { useEffect } from "react";
import styled from "styled-components";
import { pinPNG } from "../assets/images/png";
import {
  defaultLatitude,
  defaultLongitude,
} from "../constants/commonCoordinates";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const position = new window.kakao.maps.LatLng(
      defaultLatitude,
      defaultLongitude
    );

    if (container) {
      const options = {
        center: position,
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(
          defaultLatitude,
          defaultLongitude
        ),
        content: `<a href="https://map.kakao.com/link/map/${defaultLatitude},${defaultLongitude}" target="_blank"><img src="${pinPNG}" width="30" height="46" /></a>`,
      });
      customOverlay.setMap(map);
    }
  }, []);

  return <MapContainer id="map" />;
};

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 40px;
`;

export default KakaoMap;
