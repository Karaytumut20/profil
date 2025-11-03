// src/components/public/Footer.js
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4, 
        bgcolor: 'background.paper', 
        borderTop: 1, 
        borderColor: 'divider',
        mt: 8 
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Tüm hakları saklıdır.
        </Typography>
      </Container>
    </Box>
  );
}