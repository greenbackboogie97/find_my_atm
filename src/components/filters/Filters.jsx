import React, { useContext, useEffect, useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { BiCaretDown, BiHandicap } from 'react-icons/bi';
import { Collapse, FormGroup } from '@material-ui/core';
import SelectFilterBase from './SelectFIlterBase';
import StoreContext from '../../context/Store';

export default function Filters() {
  const classes = useStyles();
  const { store: {records, filter}, setStore } = useContext(StoreContext);
  const [banks, setBanks] = useState([]);
  const [expanded, toggleExpanded] = useReducer(expanded => !expanded, false);

  const handleFilterChange = (e, filter) =>
    setStore((prev) => ({...prev,
      filter: { ...prev.filter, [filter]: e.target.value },
    }));

  // Dynamic bank options
  useEffect(() => {
    const derivedBanks = records.list?.map((record) => ({
      bankCode: record.Bank_Code,
      bankName: record.Bank_Name,
    }));

    const filteredBanks = [];

    derivedBanks.forEach((bank) => {
      if (filteredBanks.some((el) => el.bankCode === bank.bankCode)) return;
      return filteredBanks.push(bank);
    });

    setBanks(filteredBanks);
  }, [records]);

  return (
    <div className={classes.root}>
      <span className={classes.filtersButton} onClick={toggleExpanded}>
        <BiCaretDown className={classes.icon} />
        פילטרים
      </span>

      <Collapse in={expanded}>
        <FormGroup className={classes.filters}>
          {/* Bank Name Filter */}
          <SelectFilterBase
            value={filter.bankName}
            onChange={(e) => handleFilterChange(e, 'bankName')}
            disabled={!banks.length}
            filterLabel={{ title: 'בנק' }}
            items={[
              { value: '', title: 'הכל' },
              ...banks.map(({bankName, bankCode}) => ({
                value: bankName,
                title: bankName,
                key: bankCode,
              })),
            ]}
          />

          {/* ATM Type Filter */}
          <SelectFilterBase
            value={filter.ATM_Type}
            onChange={(e) => handleFilterChange(e, 'ATM_Type')}
            filterLabel={{ title: 'סוג כספומט' }}
            items={[
              { value: '', title: 'הכל' },
              { value: 'משיכת מזומן', title: 'משיכת מזומן' },
              {
                value: 'מכשיר מידע/או מתן הוראות\n',
                title: 'מידע/או מתן הוראות',
              },
            ]}
          />

          {/* Accessible Filter */}
          <SelectFilterBase
            value={filter.accessible}
            onChange={(e) => handleFilterChange(e, 'accessible')}
            filterLabel={{
              title: 'נגיש',
              icon: <BiHandicap color='#0097F0' />,
            }}
            items={[
              { value: '', title: 'הכל' },
              { value: 'כן', title: 'כן' },
              { value: 'לא', title: 'לא' },
            ]}
          />
        </FormGroup>
      </Collapse>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2)
  },
  filtersButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 12,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    cursor: 'pointer'
  },
  filters: {
    alignItems: 'flex-end',
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: 15
  },
}));
