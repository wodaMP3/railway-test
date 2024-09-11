import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { FeatureCollection } from "geojson"; // type for geojson data
import "leaflet/dist/leaflet.css";

interface SegmentData {
  properties: {
    YARDNAME: string;
    KM: number;
    OBJECTID: number; // unic number
  };
  geometry: {
    type: string;
    coordinates: [number, number][]; 
  };
}

interface MapProps {
  geojsonData: FeatureCollection; // type for geojson data
}

const RailMap: React.FC<MapProps> = ({ geojsonData }) => {
  const [selectedSegments, setSelectedSegments] = useState<SegmentData[]>([]);

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        const selected: SegmentData = {
          properties: feature.properties,
          geometry: feature.geometry,
        };

        setSelectedSegments((prevSegments) => {
          // check, if segment is selected
          const alreadySelected = prevSegments.find(
            (segment) => segment.properties.OBJECTID === selected.properties.OBJECTID
          );
          if (alreadySelected) {
            // if selected - remove 
            return prevSegments.filter(
              (segment) => segment.properties.OBJECTID !== selected.properties.OBJECTID
            );
          }
          // else - add
          return [...prevSegments, selected];
        });
      },
      mouseover: () => {
        layer.setStyle({
          weight: 5,
          color: "#666",
          dashArray: "",
          fillOpacity: 0.7,
        });
      },
      mouseout: () => {
        layer.setStyle({
          weight: 2,
          color: "#3388ff",
          dashArray: "",
          fillOpacity: 0.5,
        });
      },
    });
  };

  return (
    <div>
      <MapContainer
        center={[42.3601, -71.0589]} // map coordinates
        zoom={10}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
      </MapContainer>

      <div className="info-box">
        <h3>Selected Segments:</h3>
        {selectedSegments.length === 0 ? (
          <p>No segments selected</p>
        ) : (
          <ul>
            {selectedSegments.map((segment, index) => (
              <li key={index}>
                Yard Name: {segment.properties.YARDNAME}, KM: {segment.properties.KM}
                <button
                  onClick={() => {
                    setSelectedSegments((prevSegments) =>
                      prevSegments.filter((_, i) => i !== index)
                    );
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {selectedSegments.length > 0 && (
          <button onClick={() => setSelectedSegments([])}>Clear Selection</button>
        )}
      </div>
    </div>
  );
};

export default RailMap;
