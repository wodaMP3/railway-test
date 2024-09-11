import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { FeatureCollection } from "geojson"; // types for geojson
import "leaflet/dist/leaflet.css";

interface SegmentData {
  properties: {
    YARDNAME: string;
    KM: number;
  };
  geometry: {
    type: string;
    coordinates: [number, number][];
  };
}

interface MapProps {
  geojsonData: FeatureCollection; // Use type for geojson data
}

const RailMap: React.FC<MapProps> = ({ geojsonData }) => {
  const [selectedSegment, setSelectedSegment] = useState<SegmentData | null>(null);

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        setSelectedSegment({
          properties: feature.properties,
          geometry: feature.geometry,
        });
      },
    });
  };

  return (
    <div>
      <MapContainer
        center={[42.3601, -71.0589]} // Map coordinates
        zoom={10}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
      </MapContainer>

      {selectedSegment && (
        <div className="info-box">
          <h3>Selected Segment:</h3>
          <p>Yard Name: {selectedSegment.properties.YARDNAME}</p>
          <p>KM: {selectedSegment.properties.KM}</p>
        </div>
      )}
    </div>
  );
};

export default RailMap;
