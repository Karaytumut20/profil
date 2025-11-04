'use client';
import { useState } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// --- YENİ LÜKS TEMA ---
const luxDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c084fc', // Açık, parlak mor (vurgular için)
    },
    secondary: {
      main: '#7e22ce', // Koyu, doygun mor (ana eylem rengi)
    },
    background: {
      // Çok koyu, zengin bir arka plan
      default: '#02000a', 
      // Kartlar ve bölümler için hafifçe aydınlatılmış arka plan
      paper: '#110d19', 
    },
    text: {
      primary: '#f3e8ff', // Saf beyaz yerine hafif mor/krem
      secondary: '#a7a2b0', // Gri-mor tonu
    },
    divider: 'rgba(192, 132, 252, 0.1)', // Mor tonlu ayırıcı
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { 
      fontWeight: 700,
      // Parlak bir başlık rengi
      color: '#e9d5ff',
    },
    h2: { 
      fontWeight: 700,
      color: '#e9d5ff',
    },
    h3: {
      fontWeight: 600,
      color: '#e9d5ff',
    },
  },
  components: {
    // Butonları daha "lux" yapalım
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Hafif yuvarlatılmış köşeler
          textTransform: 'none', // "HEPSİ BÜYÜK" olmasın
          fontWeight: 600,
        },
        containedPrimary: {
          // Mor gradyan buton
          background: 'linear-gradient(45deg, #a855f7 30%, #c084fc 90%)',
          boxShadow: '0 3px 5px 2px rgba(192, 132, 252, .3)',
          color: 'white',
        },
        outlinedPrimary: {
          borderColor: '#a855f7', // Ana mor
          color: '#c084fc',
          '&:hover': {
            backgroundColor: 'rgba(192, 132, 252, 0.08)',
            borderColor: '#c084fc',
          }
        }
      }
    },
    // AppBar (Navbar) stilini güncelleyelim
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Arka planı yarı saydam ve bulanık yap (ikonik görünüm)
          backgroundColor: 'rgba(17, 13, 25, 0.7)', // background.paper'ın saydam hali
          backdropFilter: 'blur(10px)',
          boxShadow: 'none', // Sadece alt çizgi
          borderBottom: '1px solid rgba(192, 132, 252, 0.1)',
        }
      }
    },
    // Kart stilleri
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // MUI'nin varsayılan gradyanını kaldır
          backgroundColor: '#110d19', // background.paper
          border: '1px solid rgba(192, 132, 252, 0.1)', // Mor çerçeve
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            // İkonik mor "glow" efekti
            boxShadow: '0 0 15px 5px rgba(168, 85, 247, 0.2)',
          }
        }
      }
    }
  }
});
// --- TEMA BİTİŞİ ---

export default function ThemeProvider({ children }) {
  
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'mui-styles' });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      {/* Güncellenen temayı burada kullanıyoruz */}
      <MUIThemeProvider theme={luxDarkTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  );
}