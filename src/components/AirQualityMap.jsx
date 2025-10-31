import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Eski varsayılan ikon ayarlarını sıfırlıyoruz
delete L.Icon.Default.prototype._getIconUrl;

// Yeni ikon yollarını import edilen değerlerle güncelliyoruz
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MapFocusUpdater = ({ selectedPosition, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedPosition) {
      map.flyTo(selectedPosition, zoom);
    }
  }, [selectedPosition, zoom, map]);

  return null;
};

const AirQualityMap = ({
  stations,
  selectedStationId,
  setSelectedStationId,
}) => {
  const initialPosition = useMemo(() => [41.100072, 29.024512], []);
  const initialZoom = 10;
  const focusZoom = 15;

  const selectedStation = stations.find((s) => s.id === selectedStationId);
  const selectedPosition = selectedStation ? selectedStation.position : null;

  return (
    <MapContainer
      center={initialPosition}
      zoom={initialZoom}
      scrollWheelZoom={true}
      className="h-100 w-100 rounded"
    >
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />

      <MapFocusUpdater selectedPosition={selectedPosition} zoom={focusZoom} />

      {stations.map((station) => (
        <Marker
          key={station.id}
          position={station.position}
          eventHandlers={{
            click: () => {
              setSelectedStationId(station.id);
            },
          }}
        >
          <Popup>{station.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default AirQualityMap;
