import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Theme from './Theme';
import Map from './components/Map';
import AccessPanel from './components/AccessPanel';
import StoreContext, { initialState } from './context/Store';
import FilteredRecordsContext from './context/FilteredRecordsContext';

export default function App() {
  const classes = useStyles();
  const [store, setStore] = useState(initialState);
  const [filteredRecords, setFilteredRecords] = useState(store.records);

  useEffect(() => {
    if (!store.records.length) return;
    setFilteredRecords(store.records);
  }, [store.records]);

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
  }, [store.filter, store.records]);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <FilteredRecordsContext.Provider
        value={{ filteredRecords, setFilteredRecords }}
      >
        <Theme>
          <div className={classes.root}>
            <Map />
            <AccessPanel />
          </div>
        </Theme>
      </FilteredRecordsContext.Provider>
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
