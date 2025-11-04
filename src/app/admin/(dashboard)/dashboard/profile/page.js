'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabaseClient';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Grid, Avatar } from '@mui/material';

export default function ManageProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({ full_name: '', title: '', bio: '', profile_image_url: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .limit(1)
      .single();
    
    if (data) setProfile(data);
    setLoading(false);
  };

  const handleFieldChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    let finalImageUrl = profile.profile_image_url;

    if (imageFile) {
      // Profil resmi için benzersiz bir ad (örn: "avatar.png")
      const fileName = `avatar.${imageFile.name.split('.').pop()}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio_images') // Projelerle aynı bucket'ı kullanıyoruz
        .upload(fileName, imageFile, { upsert: true }); // 'upsert: true' ile üzerine yaz

      if (uploadError) {
        console.error('Resim Yükleme Hatası:', uploadError);
        setSaving(false);
        return;
      }
      
      // Public URL'i al (zaman damgası ekleyerek cache'i yenile)
      const { data: publicURLData } = supabase.storage
        .from('portfolio_images')
        .getPublicUrl(fileName);
      finalImageUrl = `${publicURLData.publicUrl}?t=${new Date().getTime()}`;
    }

    const { error: updateError } = await supabase
      .from('profile')
      .update({
        full_name: profile.full_name,
        title: profile.title,
        bio: profile.bio,
        profile_image_url: finalImageUrl,
      })
      .eq('id', 1); // SQL şemamızda ID'yi 1 olarak sabitlemiştik

    if (updateError) {
      console.error('Profil Güncelleme Hatası:', updateError);
    } else {
      setProfile({ ...profile, profile_image_url: finalImageUrl });
      setImageFile(null);
    }
    setSaving(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>Profil Yönetimi</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Avatar 
              src={profile.profile_image_url || ''} 
              sx={{ width: 150, height: 150, margin: 'auto', mb: 2 }} 
            />
            <Button variant="outlined" component="label" size="small">
              Resmi Değiştir
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            {imageFile && <Typography variant="caption" display="block" sx={{mt: 1}}>{imageFile.name}</Typography>}
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Tam Adınız"
              name="full_name"
              fullWidth
              margin="normal"
              value={profile.full_name || ''}
              onChange={handleFieldChange}
            />
            <TextField
              label="Ünvan"
              name="title"
              fullWidth
              margin="normal"
              value={profile.title || ''}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bio (Hakkımda)"
              name="bio"
              fullWidth
              multiline
              rows={5}
              margin="normal"
              value={profile.bio || ''}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" disabled={saving} fullWidth size="large">
              {saving ? <CircularProgress size={24} /> : 'Profili Kaydet'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}