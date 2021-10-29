import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Theme from './Theme';
import Map from './components/Map';
import AccessPanel from './components/AccessPanel';
import StoreContext, { initialState } from './context/Store';

export default function App() {
  const classes = useStyles();
  const [store, setStore] = useState(initialState);

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
