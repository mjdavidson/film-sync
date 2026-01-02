import type { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

function Map({ coords }: { coords: LatLngExpression }) {
  console.log({ coords });
  return (
    <MapContainer
      center={coords}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "250px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}></Marker>
    </MapContainer>
  );
}

export default Map;
