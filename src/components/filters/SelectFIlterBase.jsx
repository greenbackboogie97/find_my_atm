import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormControlLabel, MenuItem, Select } from '@material-ui/core';

export default function SelectFilterBase({ value, onChange, disabled, items, filterLabel }) {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Select className={classes.root} value={value} onChange={onChange} disabled={disabled} >
          {items.map((item, index) => (
              <MenuItem key={item.key || index} className={classes.item} value={item.value}>
                {item.title}
              </MenuItem>))}
        </Select>
      }
      label={<span className={classes.label}>{filterLabel.icon} {filterLabel.title}</span>}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 36,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  item: {
    direction: 'rtl',
  },
  label: {
    fontSize: 14,
     display: 'flex',
      alignItems: 'center' 
  }
}));
