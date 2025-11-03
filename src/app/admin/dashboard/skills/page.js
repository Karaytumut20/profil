'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { Box, TextField, Button, Typography, Paper, Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillIconUrl, setNewSkillIconUrl] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data } = await supabase.from('skills').select('*').order('name');
    setSkills(data || []);
    setLoading(false);
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName || !newSkillIconUrl) return;

    await supabase.from('skills').insert([
      { name: newSkillName, icon_svg_url: newSkillIconUrl }
    ]);
    setNewSkillName('');
    setNewSkillIconUrl('');
    fetchSkills();
  };

  const handleDelete = async (id) => {
    await supabase.from('skills').delete().match({ id });
    fetchSkills();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>Yeni Yetenek Ekle</Typography>
          <Box component="form" onSubmit={handleAddSkill}>
            <TextField
              label="Yetenek Adı (örn: React)"
              fullWidth
              margin="normal"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              required
            />
            <TextField
              label="İkon URL (SVG/PNG)"
              fullWidth
              margin="normal"
              value={newSkillIconUrl}
              onChange={(e) => setNewSkillIconUrl(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
              Ekle
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={7}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>Mevcut Yetenekler</Typography>
          <List>
            {loading ? <ListItemText primary="Yükleniyor..." /> : 
              skills.map((skill) => (
                <ListItem
                  key={skill.id}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDelete(skill.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <img src={skill.icon_svg_url} alt={skill.name} width="24" height="24" style={{ marginRight: '16px' }} />
                  <ListItemText primary={skill.name} />
                </ListItem>
              ))
            }
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}