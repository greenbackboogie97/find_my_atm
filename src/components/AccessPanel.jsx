import React from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import Search from './Search';
import ATM_LIST from './ATM_LIST';
import Filters from './Filters';

export default function AccessPanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Search />
      <Filters />
      <Divider className={classes.divider} />
      <ATM_LIST />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 4,
    position: 'absolute',
    top: theme.spacing(5),
    right: theme.spacing(5),
    height: 'calc(100vh - 40px)',
    width: '340px',
    background: '#FCFCFC',
    boxShadow: '2px 2px 10px #bfbfbf, -1px -1px 5px #E6E6E6 inset',
    borderRadius: theme.spacing(6),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
}));
