'use client'
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Loader from '../components/Loader';

const containerStyle = {
  width: '500px',
  height: '350px'
};

const centre = {
  lat: 43.03078058900204,
  lng: -89.28712732976616
};

const GoogleMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.API_KEY! ?? "" } loadingElement={<Loader />}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centre}
        zoom={15}
      >
        <Marker position={centre} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;