// src/components/public/ContactForm.js
'use client';
import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, CircularProgress, Alert, Grid } from '@mui/material'; // Grid'i ekledim

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    // Şimdilik sadece bir gecikme simülasyonu yapalım
    setTimeout(() => {
      console.log({ name, email, message });
      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <Box id="contact" sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h2" gutterBottom align="center">
          İletişime Geçin
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Adınız"
                variant="filled"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Adresiniz"
                type="email"
                variant="filled"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mesajınız"
                variant="filled"
                fullWidth
                required
                multiline
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center', position: 'relative' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ minWidth: '150px' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Gönder'}
              </Button>
            </Grid>
          </Grid>
          {success && <Alert severity="success" sx={{ mt: 3 }}>Mesajınız başarıyla gönderildi!</Alert>}
          {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
        </Box>
      </Container>
    </Box>
  );
}