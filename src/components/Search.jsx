import React, { useCallback, useContext, useEffect, useState } from 'react';
import { makeStyles, TextField, Typography } from '@material-ui/core';
import StoreContext from '../context/Store';
import getATMs from '../services/AutoDevicesAPI';
import { MdArrowLeft } from 'react-icons/md';
import { withStyles } from '@material-ui/styles';

const LeftArrowAdornment = withStyles({
  root: {
    backgroundColor: '#eff0f2',
    borderRadius: 4,
    border: '1px solid #b4b4b4',
    width: 26,
    height: 22,
    marginLeft: 14,
    color: '#aaa',
    boxShadow: '1px 1px gray, 0 0 1px gray',
  },
})(({ classes }) => <MdArrowLeft className={classes.root} />);

export default function Search() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const { setStore } = useContext(StoreContext);

  const handleValueChange = (e) => setValue(e.target.value);

  const handleLeftKeyPress = (e) => {
    if (!suggestion) return;
    if (e.key === 'ArrowLeft') {
      setValue(suggestion);
      setSuggestion('');
    }
  };

  const getRecords = useCallback(async () => {
    setSuggestion('');
    const results = await getATMs(value);
    if (!results.length) return;

    const filterdByCity = results.filter((record) => record.City === value);

    if (!filterdByCity.length)
      return setSuggestion(
        results.filter((record) => record.City.startsWith(value))[0]?.City
      );

    setStore((prev) => ({ ...prev, records: [...filterdByCity] }));
  }, [value, setStore]);

  useEffect(() => {
    if (!value.length) return;
    getRecords();
  }, [value, getRecords]);

  useEffect(() => {
    if (!value.length) return setSuggestion('');
  }, [suggestion, value]);

  return (
    <div className={classes.root}>
      <TextField
        value={value}
        onChange={handleValueChange}
        onKeyDown={handleLeftKeyPress}
        placeholder='חפש/י כספומט לפי עיר'
        dir='rtl'
        className={classes.searchInput}
        InputProps={{
          endAdornment: suggestion ? <LeftArrowAdornment /> : null,
        }}
      />
      <Typography className={classes.suggestion}>{suggestion}</Typography>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
    height: 'fit-content',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  searchInput: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
  suggestion: {
    direction: 'rtl',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    paddingRight: 14,
    color: '#aaa',
  },
});
