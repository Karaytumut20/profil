// app/components/public/ProjectsGrid.js
import { Container, Grid, Typography, Box } from '@mui/material';
import ProjectCard from './ProjectCard'; // Bir sonraki adımda yapacağız

export default function ProjectsGrid({ projects }) {
  return (
    <Box id="projects" sx={{ py: 8, bgcolor: 'background.paper' }}> {/* Hafif farklı arka plan */}
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Çalışmalarım
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {projects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}