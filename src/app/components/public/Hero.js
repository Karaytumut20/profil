// src/app/components/public/Hero.js
import { Container, Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
// Artık 'use client' veya 'ThreeDText' importuna gerek yok.
// Bu bileşen artık hızlı bir Server Component.

export default function Hero({ profile }) {
  return (
    <Container maxWidth="md">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '80vh',
        justifyContent: 'center',
        py: { xs: 8, md: 12 },
      }}>
        
        {/* YENİ ANİMASYONLU LÜKS BAŞLIK */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '3.5rem', sm: '5rem', md: '6rem' },
            fontWeight: 800,
            // Lüks Mor Degrademizi (Gradient) burada kullanıyoruz
            background: 'linear-gradient(45deg, #c084fc 30%, #7e22ce 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // Hafif "nefes alma" animasyonu
            animation: 'glow 8s ease-in-out infinite',
            mb: 2,
            // Animasyon için @keyframes tanımı
            '@keyframes glow': {
              '0%': {
                filter: 'drop-shadow(0 0 5px rgba(192, 132, 252, 0.4))'
              },
              '50%': {
                filter: 'drop-shadow(0 0 20px rgba(192, 132, 252, 0.8))'
              },
              '100%': {
                filter: 'drop-shadow(0 0 5px rgba(192, 132, 252, 0.4))'
              }
            }
          }}
        >
          Umut Karaytu
        </Typography>

        <Typography 
          variant="h4" 
          component="h2"
          gutterBottom
          sx={{
            color: 'primary.main', // Temamızdaki parlak mor
            fontWeight: 500,
            mt: 2,
          }}
        >
          {profile.title || 'Ünvanınız'}
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            maxWidth: '600px', 
            mb: 4,
            fontSize: '1.1rem',
            lineHeight: 1.7
          }}
        >
          {profile.bio || 'Buraya bio (hakkımda) yazınız gelecek. Admin panelinden güncelleyebilirsiniz.'}
        </Typography>
        
        <Button 
          variant="outlined" 
          color="primary"
          size="large" 
          startIcon={<DownloadIcon />}
          // href="/cv.pdf"
        >
          CV'mi İndir
        </Button>
      </Box>
    </Container>
  );
}