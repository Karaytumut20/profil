// app/components/public/ProjectCard.js
'use client';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

export default function ProjectCard({ project }) {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3, // Hafif gölge
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={project.image_url || 'https://via.placeholder.com/600x400.png?text=Proje+G%C3%B6rseli'}
        alt={project.title}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h3">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ borderTop: 1, borderColor: 'divider', px: 2 }}>
        {project.project_url && (
          <Button 
            size="small" 
            href={project.project_url} 
            target="_blank" 
            rel="noopener noreferrer"
            startIcon={<LaunchIcon />}
          >
            Projeyi Gör
          </Button>
        )}
      </CardActions>
    </Card>
  );
}