// src/components/public/Skills.js
import { Container, Box, Typography, Grid, Paper } from '@mui/material';

export default function Skills({ skills }) {
  return (
    <Box id="skills" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Yeteneklerim
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4, justifyContent: 'center' }}>
          {skills.map((skill) => (
            <Grid item key={skill.id}>
              <Paper 
                elevation={3}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 120,
                  height: 120,
                  justifyContent: 'center',
                }}
              >
                <img src={skill.icon_svg_url} alt={skill.name} width="50" height="50" />
                <Typography variant="caption" sx={{ mt: 1.5 }}>
                  {skill.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}