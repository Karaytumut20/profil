// app/admin/dashboard/page.js
'use client';
import { Typography, Paper, Box } from '@mui/material';

export default function AdminDashboard() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hoş Geldiniz
      </Typography>
      <Typography>
        Sol taraftaki menüyü kullanarak portfolyo sitenizin içeriğini (Profil, Projeler, Yetenekler) yönetebilirsiniz.
      </Typography>
    </Paper>
  );
}