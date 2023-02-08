import React from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../../assets/icons/mapPin.svg";
import L from "leaflet";

const makerIcon = new L.icon({
  iconUrl: icon,
  iconSize: 100,
  popupAnchor: [-4, -20],
});

export const MapView = () => {
  return (
    <div className='flex h-510 w-full'>
      <MapContainer
        center={[-33.86869, 151.209751]}
        zoom={50}
        scrollWheelZoom={true}
        className='map'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[-33.86869, 151.209751]} icon={makerIcon}>
          <Popup>
            P. Sherman, 42 Wallaby Way, Sydney. <br />{" "}
            <a href='https://goo.gl/maps/rKabxuFd5uzYg1Do7' target='_blank'>
              Click Here to view in Maps
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
