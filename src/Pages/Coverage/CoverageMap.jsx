import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import coverageData from "../../assets/warehouses.json";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Component to fly to searched district
const FlyToDistrict = ({ searchTerm }) => {
  const map = useMap();

  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const match = coverageData.find((d) =>
      d.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (match) {
      const latlng = [match.latitude, match.longitude];
      map.flyTo(latlng, 10, {
        duration: 1.5,
      });
    }
  }, [searchTerm, map]);

  return null;
};

const CoverageMap = ({ searchTerm }) => {
  const center = [23.685, 90.3563]; // Bangladesh center

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "600px", width: "50%" }}
      className="rounded-lg mx-auto shadow"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Search helper */}
      <FlyToDistrict searchTerm={searchTerm} />

      {coverageData.map((district, idx) => (
        <Marker key={idx} position={[district.latitude, district.longitude]}>
          <Popup>
            <div className="text-sm">
              <p className="font-bold">{district.district}</p>
              <p>City: {district.city}</p>
              <p>
                <strong>Areas:</strong> {district.covered_area.join(", ")}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CoverageMap;
