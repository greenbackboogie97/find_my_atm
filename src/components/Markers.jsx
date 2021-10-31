import React, { useContext, useEffect } from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import FilteredRecordsContext from '../context/FilteredRecordsContext';

export default function Markers() {
  const map = useMap();
  const { filteredRecords } = useContext(FilteredRecordsContext);

  useEffect(() => {
    if (!map || !filteredRecords.length) return;

    const bounds = filteredRecords.map((record) => [
      record.X_Coordinate,
      record.Y_Coordinate,
    ]);
    map.fitBounds(bounds, { animate: true, easeLinearity: 0.1, duration: 3 });
  }, [map, filteredRecords]);

  return filteredRecords.map((record) => {
    return (
      <Marker
        key={record._id}
        position={[record.X_Coordinate, record.Y_Coordinate]}
      >
        <Tooltip direction='top' opacity={0.7} sticky>
          <div style={{ direction: 'rtl' }}>
            {record.Bank_Name} - {record.Bank_Code}
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
