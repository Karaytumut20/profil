// src/app/components/public/Hero.js
import { Container, Box, Typography, Button, Avatar } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

// Bu bileşen 'page.js' tarafından sunucuda render edilir
export default function Hero({ profile }) {
  return (
    <Container maxWidth="md">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        py: { xs: 8, md: 12 },
      }}>
        <Avatar
          alt={profile.full_name}
          src={profile.profile_image_url || 'https://via.placeholder.com/150'}
          sx={{ width: 150, height: 150, mb: 3, border: 4, borderColor: 'primary.main' }}
        />
        <Typography variant="h2" component="h1" gutterBottom>
          {profile.full_name || 'Adınız'}
        </Typography>
        <Typography variant="h5" color="primary.main" gutterBottom>
          {profile.title || 'Ünvanınız'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mb: 4 }}>
          {profile.bio || 'Buraya bio (hakkımda) yazınız gelecek. Admin panelinden güncelleyebilirsiniz.'}
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          startIcon={<DownloadIcon />}
          // href="/cv.pdf" // Buraya CV linkinizi ekleyin
        >
          CV'mi İndir
        </Button>
      </Box>
    </Container>
  );
}