import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      light: '#69DADB',
      main: '#1597E5',
      dark: '#113CFC',
      darker: '#193498'
    },
    background: '#ffff',
  },
  typography: {
    fontFamily: 'Rubik',
  },
  spacing: 4,
  shape: {
    borderRadius: 12,
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
  },
});

export default function Theme(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>{props.children}</CssBaseline>
    </ThemeProvider>
  );
}
