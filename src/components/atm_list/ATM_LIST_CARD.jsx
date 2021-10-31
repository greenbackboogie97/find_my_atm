import React, { useContext } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { BiHandicap } from 'react-icons/bi';
import { IoIosInformationCircle } from 'react-icons/io';
import { MdLocalAtm } from 'react-icons/md';
import StoreContext from '../../context/Store';

export default function Atm_List_Card(props) {
  const classes = useStyles(props);
  const { store } = useContext(StoreContext);

  const handleCardClick = () => {
    const map = store.mapRef;
    map.panTo(props.coords, { animate: true, duration: 1 });
    const zoomAfter = () => map.setZoom(16);
    setTimeout(zoomAfter, 1000);
  };

  return (
    <div className={classes.root} onClick={handleCardClick}>
      <Typography className={classes.bank}>
        {props.bankName} {props.bankCode}
      </Typography>
      <Typography className={classes.details}>
        {props.address.length > 3 ? props.address : 'כתובת חסרה'}
      </Typography>
      <Typography className={classes.details}>
        {props.typeATM === 'משיכת מזומן' ? (
          <MdLocalAtm color='#30A24C' className={classes.atmIcon} />
        ) : (
          <IoIosInformationCircle color='#7401FA' className={classes.atmIcon} />
        )}
        {props.typeATM}
      </Typography>
      {props.accessible && <BiHandicap className={classes.handicap} />}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: (props) =>
      props.typeATM === 'משיכת מזומן' ? '#E8FFF1' : '#EDE3FF',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '1px 1px 2px #efefef, -1px -1px 2px #fff',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    position: 'relative',
    transition: '0.18s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  bank: {
    direction: 'rtl',
    letterSpacing: 0.01,
    fontSize: 16,
    marginBottom: theme.spacing(1),
  },
  details: {
    direction: 'rtl',
    letterSpacing: 0.01,
    fontSize: 14,
    alignItems: 'center',
    display: 'flex',
  },
  handicap: {
    position: 'absolute',
    color: '#0097F0',
  },
  atmIcon: {
    fontSize: 14,
    marginLeft: theme.spacing(1),
  },
}));
