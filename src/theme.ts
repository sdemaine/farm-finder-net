// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      main: '#fbc02d',
    },
  },
  typography: {
    fontFamily: 'Rockwell, serif',
  },
});

export default theme;
