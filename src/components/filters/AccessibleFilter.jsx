import React, { useContext } from 'react';
import {
  FormControlLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { BiHandicap } from 'react-icons/bi';
import FilterLabel from './FilterLabel';
import StoreContext from '../../context/Store';

export default function AccessibleFilter() {
  const classes = useStyles();
  const { store, setStore } = useContext(StoreContext);

  const handleAccessibleChange = (e) =>
    setStore((prev) => ({
      ...prev,
      filter: { ...prev.filter, accessible: e.target.value },
    }));

  return (
    <FormControlLabel
      control={
        <Select
          className={classes.root}
          value={store.filter.accessible}
          onChange={handleAccessibleChange}
        >
          <MenuItem className={classes.item} value={''}>
            הכל
          </MenuItem>
          <MenuItem className={classes.item} value={'כן'}>
            כן
          </MenuItem>
          <MenuItem className={classes.item} value={'לא'}>
            לא
          </MenuItem>
        </Select>
      }
      label={<FilterLabel icon={<BiHandicap color='#0097F0' />} title='נגיש' />}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 36,
    marginRight: 4
  },
  item: {
    direction: 'rtl',
  },
}));
