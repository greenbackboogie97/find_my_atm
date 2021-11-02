import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import ATM_LIST_CARD from './ATM_LIST_CARD';
import ResultsTag from './ResultsTag';
import StoreContext from '../../context/Store';

export default function ATM_LIST() {
  const classes = useStyles();
  const { store: {records, filter}, setStore } = useContext(StoreContext);
  const [filteredList, setFilteredList] = useState([]);

  const handleLoadClick = () => {
    setStore(prev => ({...prev, records: {...prev.records, page: prev.records.page + 1 }}))
  };

  const loadRecords = useCallback(() => setFilteredList(
    records.list.slice(0, records.page * 100).filter((record) => {
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
        (filter.bankName
          ? filter.bankName === record.Bank_Name
          : true)
      )})
      ), [filter, records])

  useEffect(() => {
    loadRecords();
  }, [filter, records, loadRecords]);

  return (
    <>
      {!!filteredList.length && (
        <ResultsTag number={filteredList.length} />
      )}

      <ul className={classes.list}>
        {filteredList.map((record) => {
          const {
            _id,
            Bank_Name,
            ATM_Address,
            ATM_Type,
            Handicap_Access,
            X_Coordinate,
            Y_Coordinate,
          } = record;

          if (!X_Coordinate || !Y_Coordinate ) return null;
          return (
            <ATM_LIST_CARD
              key={_id}
              bankName={Bank_Name}
              address={ATM_Address}
              typeATM={ATM_Type}
              accessible={Handicap_Access === 'כן'}
              coords={[X_Coordinate, Y_Coordinate]}
            />
          );
        })}
      </ul>

      <Button className={classes.loadMore} onClick={handleLoadClick}>
        טען עוד
      </Button>
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
    borderRadius: 20,
  },
  loadMore: {
    marginTop: theme.spacing(3),
  },
}));
