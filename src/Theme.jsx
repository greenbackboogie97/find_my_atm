import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1597E5',
    },
  },
  typography: {
    fontFamily: 'Rubik',
  },
  spacing: 4,
  shape: {
    borderRadius: 16,
  },
  props: {
    MuiPaper: {
      elevation: 4,
    },
    MuiTextField: {
      size: 'small',
      variant: 'outlined',
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiSelect: {
      variant: 'outlined',
      autoWidth: true,
    },
  },
});

export default function Theme(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>{props.children}</CssBaseline>
    </ThemeProvider>
  );
}
