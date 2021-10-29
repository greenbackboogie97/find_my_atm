import React from 'react';
import { makeStyles } from '@material-ui/core';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function Map() {
  const classes = useStyles();

  return (
    <MapContainer
      className={classes.root}
      center={[31.7, 35.2]}
      zoom={7}
      minZoom={7}
      maxBounds={[
        [33.7, 42.2],
        [29.6, 28.2],
      ]}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        bounds={[
          [34.715, 43],
          [29, 29],
        ]}
      />
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
