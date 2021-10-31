import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { FormControlLabel, MenuItem, Select } from '@material-ui/core';

function FilterLabel(props) {
  return (
    <span style={{ fontSize: 14, display: 'flex', alignItems: 'center' }}>
      {props.icon}
      {props.title}
    </span>
  );
}

export default function SelectFilterBase(props) {
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        <Select
          className={classes.root}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        >
          {props.items.map((item) => {
            return (
              <MenuItem className={classes.item} value={item.value}>
                {item.title}
              </MenuItem>
            );
          })}
        </Select>
      }
      label={
        <FilterLabel
          title={props.filterLabel.title}
          icon={props.filterLabel.icon}
        />
      }
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
}));
