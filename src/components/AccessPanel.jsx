import React from 'react';
import { makeStyles } from '@material-ui/core';
import Search from './Search';

export default function AccessPanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Search />
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
    width: '300px',
    background: 'white',
    borderRadius: theme.spacing(6),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
  },
}));
