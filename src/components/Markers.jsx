import { Button, Paper } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import StoreContext from '../context/Store';

export default function Markers() {
  const map = useMap();
  const { store } = useContext(StoreContext);
  const [filteredRecords, setFilteredRecords] = useState(store.records);

  useEffect(() => {
    if (!store.records) return;
    setFilteredRecords(store.records);
  }, [store.records]);

  useEffect(() => {
    if (!map || !filteredRecords.length) return;

    const bounds = filteredRecords.map((record) => [
      record.X_Coordinate,
      record.Y_Coordinate,
    ]);
    map.fitBounds(bounds, { animate: true, easeLinearity: 0.1, duration: 3 });
  }, [map, filteredRecords]);

  useEffect(() => {
    setFilteredRecords(
      store.records.filter((record) => {
        return (
          (store.filter.accessible
            ? store.filter.accessible === 'כן'
              ? record.Handicap_Access === 'כן'
              : record.Handicap_Access === 'לא'
            : true) &&
          (store.filter.ATM_Type
            ? store.filter.ATM_Type === 'מכשיר מידע/או מתן הוראות\n'
              ? record.ATM_Type === 'מכשיר מידע/או מתן הוראות\n'
              : record.ATM_Type === 'משיכת מזומן'
            : true) &&
          (store.filter.bankName
            ? store.filter.bankName === record.Bank_Name
            : true)
        );
      })
    );
  }, [store]);

  return filteredRecords.map((record) => {
    return (
      <Marker
        key={record._id}
        position={[record.X_Coordinate, record.Y_Coordinate]}
      >
        <Tooltip direction='top' opacity={0.7} sticky>
          <div style={{ direction: 'rtl' }}>
            {record.Bank_Name} {record.Bank_Code}
            <br />
            {record.ATM_Address.length > 3 ? record.ATM_Address : 'כתובת חסרה'}
            <br />
            {record.ATM_Type}
          </div>
        </Tooltip>
      </Marker>
    );
  });
}
