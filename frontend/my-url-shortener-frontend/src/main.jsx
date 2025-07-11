import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './style/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* resets browser default styles */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
