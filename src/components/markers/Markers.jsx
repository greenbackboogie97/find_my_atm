import React, { useContext, useEffect, useState } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import StoreContext from '../../context/Store';
import L from 'leaflet';
import './markers.css';
import GreenMarker from '../../static/greenMarker.svg';
import PurpleMarker from '../../static/purpleMarker.svg';

export default function Markers() {
  const {store: { mapRef, records, filter }} = useContext(StoreContext);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    if (!mapRef) return;
    let bounds = filteredRecords.map((record) => [
      record.X_Coordinate,
      record.Y_Coordinate,
    ]);
    if (!bounds.length)
      bounds = [
        [33.7, 42.2],
        [29.3, 28.2],
      ];
    mapRef.fitBounds(bounds, { animate: true, duration: 3 });
  }, [mapRef, filteredRecords]);

  useEffect(() => {
    if (!mapRef) return;
    setFilteredRecords(
      records.list.filter((record) => {
        return (
          (filter.accessible
            ? filter.accessible === 'כן'
              ? record.Handicap_Access === 'כן'
              : record.Handicap_Access === 'לא'
            : true) &&
          (filter.ATM_Type
            ? filter.ATM_Type === 'מכשיר מידע/או מתן הוראות\n'
              ? record.ATM_Type === 'מכשיר מידע/או מתן הוראות\n'
              : record.ATM_Type === 'משיכת מזומן'
            : true) &&
          (filter.bankName ? filter.bankName === record.Bank_Name : true)
        );
      })
    );
  }, [filter, records, mapRef]);

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<div>${cluster.getChildCount()}</div>`,
      className: 'marker-cluster-custom',
      iconSize: L.point(30, 30, true),
    });
  };

  const greenMarker = L.icon({
    iconUrl: GreenMarker,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const purpleMarker = L.icon({
    iconUrl: PurpleMarker,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <MarkerClusterGroup
      maxClusterRadius={20}
      iconCreateFunction={createClusterCustomIcon}
      zoomToBoundsOnClick={true}
    >
{filteredRecords.map(record => {
  if (!record.X_Coordinate || !record.Y_Coordinate) return null;

  return (<Marker
    key={record._id}
    position={[record.X_Coordinate, record.Y_Coordinate]}
    icon={record.ATM_Type === 'משיכת מזומן' ? greenMarker : purpleMarker}
  >
    <Tooltip direction='top' opacity={0.7} sticky>
      <div style={{ direction: 'rtl' }}>
        {record.Bank_Name} - {record.Bank_Code}
        <br />
        {record.ATM_Address.length > 3
          ? record.ATM_Address
          : 'כתובת חסרה'}
        <br />
        {record.ATM_Type}
      </div>
    </Tooltip>
  </Marker>)
})}
    </MarkerClusterGroup>
  );
}
