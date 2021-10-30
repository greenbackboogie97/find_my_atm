import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { BiCaretDown } from 'react-icons/bi';
import { Collapse, FormGroup } from '@material-ui/core';
import BankNameFilter from './filters/BankNameFilter';
import AtmTypeFilter from './filters/AtmTypeFilter';
import AccessibleFilter from './filters/AccessibleFilter';

export default function Filters() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState();

  const handleFiltersExpansion = () => setExpanded(!expanded);

  return (
    <div className={classes.root}>
      <span className={classes.filtersButton} onClick={handleFiltersExpansion}>
        <BiCaretDown className={classes.icon} />
        פילטרים
      </span>

      <Collapse in={expanded}>
        <FormGroup className={classes.filters}>
          <BankNameFilter />
          <AtmTypeFilter />
          <AccessibleFilter />
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
    padding: theme.spacing(2),
  },
  filtersButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 12,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    cursor: 'pointer',
  },
  filters: {
    alignItems: 'flex-end',
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: 15,
  },
}));
