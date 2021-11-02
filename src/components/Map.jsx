import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { MapContainer, TileLayer } from 'react-leaflet';
import StoreContext from '../context/Store';
import Markers from './markers/Markers';

/////////////////////////
// React Leaflet Icon Fix
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
////////////////////////

export default function Map() {
  const classes = useStyles();
  const { setStore } = useContext(StoreContext);

  return (
    <MapContainer
      className={classes.root}
      center={[31.7, 35.2]}
      whenCreated={(map) => setStore((prev) => ({ ...prev, mapRef: map }))}
      zoom={7}
      minZoom={7}
      maxBounds={[
        [33.7, 42.2],
        [29.3, 28.2],
      ]}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        bounds={[[38, 48], [26, 24]]}/>
      <Markers />
    </MapContainer>
  );
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
});
