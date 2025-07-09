import React, { useMemo, useState } from 'react';
import Home from './pages/HomePage/Home';
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const theme = useMemo(() => createTheme({
    palette: { mode }
  }), [mode]);

  // ícone do modo claro/escuro
  const toggleButton = (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home iconeMenu={toggleButton} />
    </ThemeProvider>
  );
}

export default App;
