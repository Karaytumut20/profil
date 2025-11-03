// src/app/admin/dashboard/projects/page.js
'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient'; // Yol: ../../../lib/supabaseClient
import { Typography, List, ListItem, ListItemText, IconButton, Paper, Box, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectForm from '../../../components/admin/ProjectForm'; // Yol: ../../../components/admin/ProjectForm

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at');
    setProjects(data || []);
    setProjectToEdit(null); // Formu sıfırla
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      await supabase.from('projects').delete().match({ id });
      fetchProjects();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {projectToEdit ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
          </Typography>
          <ProjectForm
            projectToEdit={projectToEdit}
            onComplete={fetchProjects} // İşlem bitince listeyi yenile
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={7}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>Mevcut Projeler</Typography>
          <List>
            {projects.map((project) => (
              <ListItem
                key={project.id}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => setProjectToEdit(project)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(project.id)} sx={{ ml: 1 }}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={project.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}