import React, { useEffect, useState } from "react";
import RailMap from "./Components/RailMap/RailMap";
import { FeatureCollection } from "geojson"; // type for geosjon

const App: React.FC = () => {
  const [geojsonData, setGeojsonData] = useState<FeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/geojson.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setGeojsonData(data))
      .catch((error) => {
        console.error("Error fetching geojson:", error);
        setError("Failed to load GeoJSON data");
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!geojsonData) {
    return <div>Loading...</div>; // loading indicator
  }

  return <RailMap geojsonData={geojsonData} />;
};

export default App;
