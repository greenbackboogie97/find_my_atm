import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import ATM_LIST_CARD from './ATM_LIST_CARD';
import ResultsTag from './ResultsTag';
import FilteredRecordsContext from '../../context/FilteredRecordsContext';

export default function ATM_LIST() {
  const classes = useStyles();
  const { filteredRecords } = useContext(FilteredRecordsContext);

  return (
    <>
      {!!filteredRecords.length && (
        <ResultsTag number={filteredRecords.length} />
      )}

      <ul className={classes.list}>
        {filteredRecords.map((record) => {
          return (
            <ATM_LIST_CARD
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
}));
