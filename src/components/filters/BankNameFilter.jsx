import { FormControlLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../../context/Store';
import FilterLabel from './FilterLabel';

export default function BankNameFilter() {
  const classes = useStyles();
  const { store, setStore } = useContext(StoreContext);
  const [banks, setBanks] = useState([]);

  const handleBankChange = (e) => {
    setStore((prev) => ({
      ...prev,
      filter: { ...prev.filter, bankName: e.target.value },
    }));
  };

  useEffect(() => {
    if (!store.records.length) return;
    const rawBanks = store.records.map((record) => ({
      bankCode: record.Bank_Code,
      bankName: record.Bank_Name,
    }));
    const filteredBanks = [];
    rawBanks.forEach((bank) => {
      if (filteredBanks.some((el) => el.bankCode === bank.bankCode)) return;
      return filteredBanks.push(bank);
    });
    setBanks(filteredBanks);
  }, [store.records]);

  return (
    <FormControlLabel
      control={
        <Select
          disabled={!banks.length}
          className={classes.root}
          onChange={handleBankChange}
          value={store.filter.bankName}
        >
          <MenuItem value={''}>הכל</MenuItem>
          {banks.map((bank) => {
            return (
              <MenuItem value={bank.bankName} key={bank.bankCode}>
                {bank.bankName}
              </MenuItem>
            );
          })}
        </Select>
      }
      label={<FilterLabel title='בנק' />}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 36,
    marginRight: 4,
    marginBottom: 4,
  },
}));
