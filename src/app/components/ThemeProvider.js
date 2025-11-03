// app/components/ThemeProvider.js
'use client';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Kapsamlı Dark Tema
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Açık mavi (MUI dark default)
    },
    secondary: {
      main: '#f48fb1', // Pembe (MUI dark default)
    },
    background: {
      default: '#121212', // Koyu arka plan
      paper: '#1e1e1e',   // Kartlar ve yüzeyler için
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
  },
});

export default function ThemeProvider({ children }) {
  return (
    <MUIThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Tarayıcı varsayılanlarını sıfırlar ve temayı uygular */}
      {children}
    </MUIThemeProvider>
  );
}