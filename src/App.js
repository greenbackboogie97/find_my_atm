import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Theme from './Theme';
import Map from './components/Map';
import AccessPanel from './components/AccessPanel';
import StoreContext, { initialState } from './context/Store';
import { getAllATMS } from './services/AutoDevicesAPI';

export default function App() {
  const classes = useStyles();
  const [store, setStore] = useState(initialState);

  useEffect(() => {
    getAllATMS().then((records) => {
      const validCoords = records.filter(record => {
        return (record.X_Coordinate > 29 &&
          record.X_Coordinate < 33 &&
          record.Y_Coordinate > 34 &&
          record.Y_Coordinate < 36)
      })

      const invalidCoords = records.filter(record => {
        return (record.X_Coordinate < 29 ||
          record.X_Coordinate > 33.5 ||
          record.Y_Coordinate < 34 ||
          record.Y_Coordinate > 36)
      })

      const fixedCoords = invalidCoords.map(record => ({...record, X_Coordinate: record.Y_Coordinate, Y_Coordinate: record.X_Coordinate}))

      setStore((prev) => ({
        ...prev,
        records: { ...prev.records, list: [...validCoords, ...fixedCoords]},
      }))
    }
    );
  }, []);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <Theme>
        <div className={classes.root}>
          <Map />
          <AccessPanel />
        </div>
      </Theme>
    </StoreContext.Provider>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
  },
});
