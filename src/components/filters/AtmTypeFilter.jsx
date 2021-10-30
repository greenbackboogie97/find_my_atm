import { FormControlLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import StoreContext from '../../context/Store';
import FilterLabel from './FilterLabel';

export default function AtmTypeFilter() {
  const classes = useStyles();
  const { store, setStore } = useContext(StoreContext);

  const handleATMTypeChange = (e) => {
    setStore((prev) => ({
      ...prev,
      filter: { ...prev.filter, ATM_Type: e.target.value },
    }));
  };

  return (
    <FormControlLabel
      control={
        <Select
          className={classes.root}
          value={store.filter.ATM_Type}
          onChange={handleATMTypeChange}
        >
          <MenuItem style={{ direction: 'rtl' }} value={''}>
            הכל
          </MenuItem>
          <MenuItem style={{ direction: 'rtl' }} value={'משיכת מזומן'}>
            משיכת מזומן
          </MenuItem>
          <MenuItem
            style={{ direction: 'rtl' }}
            value={'מכשיר מידע/או מתן הוראות\n'}
          >
            מידע/או מתן הוראות
          </MenuItem>
        </Select>
      }
      label={<FilterLabel title='סוג כספומט' />}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 36,
    marginRight: 4,
    marginBottom: 4
  },
}));
