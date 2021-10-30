import { makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../context/Store';
import ATM_CARD from './ATM_CARD';

export default function ATM_LIST() {
  const classes = useStyles();
  const { store } = useContext(StoreContext);
  const [filteredRecords, setFilteredRecords] = useState(store.records);

  useEffect(() => {
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
  }, [store]);

  return (
    <>
      {!!store.records.length && (
        <div className={classes.resultsContainer}>
          <Typography className={classes.results} variant='caption'>
            {filteredRecords.length} תוצאות
          </Typography>
        </div>
      )}

      <ul className={classes.list}>
        {filteredRecords.map((record) => {
          return (
            <ATM_CARD
              key={record._id}
              bankName={record.Bank_Name}
              address={record.ATM_Address}
              typeATM={record.ATM_Type}
              accessible={record.Handicap_Access === 'כן'}
              coords={[record.X_Coordinate, record.Y_Coordinate]}
            />
          );
        })}
      </ul>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: theme.spacing(1),
    overflow: 'auto',
    zIndex: 1,
  },
  results: {
    width: 'fit-content',
    padding: theme.spacing(1),
  },
  resultsContainer: {
    direction: 'rtl',
    marginBottom: theme.spacing(2),
  },
}));
