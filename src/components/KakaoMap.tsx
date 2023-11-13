import React, { useEffect } from "react";
import styled from "styled-components";
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
    const markerPosition = new window.kakao.maps.LatLng(
      defaultLatitude,
      defaultLongitude
    );

    if (container) {
      const options = {
        center: markerPosition,
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
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
