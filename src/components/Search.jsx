import React, { useCallback, useContext, useEffect, useState } from 'react';
import { makeStyles, TextField, Typography } from '@material-ui/core';
import StoreContext from '../context/Store';
import { MdArrowLeft } from 'react-icons/md';
import { withStyles } from '@material-ui/styles';
import { getATMsByCity } from '../services/AutoDevicesAPI';

const LeftArrowAdornment = withStyles({
  root: {
    backgroundColor: '#ffff',
    borderRadius: 4,
    border: '1px solid #dfdfdf',
    cursor: 'pointer',
    width: 26,
    height: 22,
    marginLeft: 14,
    color: '#aaa',
    boxShadow:
      '1px 1px 2px #efefef, -1px -1px 2px #ffff, -1px -1px 2px #efefef inset',
  },
})(({ classes }) => <MdArrowLeft className={classes.root} />);

export default function Search() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const {  setStore } = useContext(StoreContext);

  const handleValueChange = (e) => setValue(e.target.value);

  const handleLeftKeyPress = (e) => (suggestion && e.key === 'ArrowLeft' && setValue(suggestion) && setSuggestion(''))

  const getRecords = useCallback(async () => {
    setSuggestion('');
    const results = await getATMsByCity(value);

     const validCoords = results.filter(record => {
      return (record.X_Coordinate > 29 &&
        record.X_Coordinate < 33 &&
        record.Y_Coordinate > 34 &&
        record.Y_Coordinate < 36)
    })


    const invalidCoords = results.filter(record => {
      return (record.X_Coordinate < 29 ||
        record.X_Coordinate > 33.5 ||
        record.Y_Coordinate < 34 ||
        record.Y_Coordinate > 36)
    })

    const fixedCoords = invalidCoords.map(record => ({...record, X_Coordinate: record.Y_Coordinate, Y_Coordinate: record.X_Coordinate}))

    const newList = [...validCoords, ...fixedCoords]

    const filterdByCity = newList.filter((record) => record.City === value);

    if (!filterdByCity.length)
      return setSuggestion(
        newList.filter((record) => record.City.startsWith(value))[0]?.City
      );

      
      setStore(prev => ({...prev, records: {...prev.records, list: newList }}));
  }, [setStore, value]);

  useEffect(() => value.length && getRecords(), [value, getRecords]);

  useEffect(() => !value.length && setSuggestion(''), [suggestion, value]);

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
          endAdornment:
            suggestion && suggestion.startsWith(value) ? (
              <LeftArrowAdornment onClick={handleLeftKeyPress} />
            ) : null,
        }}
      />
      <Typography className={classes.suggestion}>{suggestion}</Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: 'fit-content',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
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
}));
