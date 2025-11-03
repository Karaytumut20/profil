// src/components/public/Navbar.js
'use client';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PORTFOLYO
          </Typography>
          <Box>
            <Button color="inherit" href="#projects">Projeler</Button>
            <Button color="inherit" href="#skills">Yetenekler</Button>
            <Button color="inherit" href="#contact">İletişim</Button>
            <Button component={Link} href="/admin/dashboard" variant="outlined" sx={{ ml: 2 }}>
              Admin Panel
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}