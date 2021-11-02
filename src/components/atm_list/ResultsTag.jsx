import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

export default function ResultsTag({number}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.results} variant='caption'>
        {number} תוצאות
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    direction: 'rtl',
    marginBottom: theme.spacing(2),
  },
  results: {
    width: 'fit-content',
    padding: theme.spacing(1),
  },
}));
