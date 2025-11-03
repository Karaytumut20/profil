// src/app/components/admin/ProjectForm.js
'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient'; // Yol: ../../../lib/supabaseClient
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

// Benzersiz dosya adı oluştur
const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

export default function ProjectForm({ projectToEdit, onComplete }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = projectToEdit != null;

  useEffect(() => {
    if (isEditing) {
      setTitle(projectToEdit.title);
      setDescription(projectToEdit.description || '');
      setProjectUrl(projectToEdit.project_url || '');
      setImageUrl(projectToEdit.image_url || '');
    } else {
        setTitle('');
        setDescription('');
        setProjectUrl('');
        setImageUrl('');
    }
  }, [projectToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let finalImageUrl = imageUrl; 

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio_images') // Supabase bucket adınız
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error('Resim yükleme hatası:', uploadError);
        setIsLoading(false);
        return;
      }

      const { data: publicURLData } = supabase.storage
        .from('portfolio_images')
        .getPublicUrl(filePath);
        
      finalImageUrl = publicURLData.publicUrl;
    }

    const projectData = {
      title,
      description,
      project_url: projectUrl,
      image_url: finalImageUrl,
    };

    let error;
    if (isEditing) {
      const { error: updateError } = await supabase
        .from('projects')
        .update(projectData)
        .match({ id: projectToEdit.id });
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('projects')
        .insert([projectData]);
      error = insertError;
    }

    if (error) {
      console.error('Veritabanı hatası:', error);
    } else {
      onComplete(); 
      setImageFile(null); 
      if (!isEditing) {
         setTitle('');
         setDescription('');
         setProjectUrl('');
         setImageUrl('');
      }
    }
    setIsLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">{isEditing ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</Typography>
      <TextField
        label="Proje Başlığı"
        fullWidth
        required
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Açıklama"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Proje URL"
        fullWidth
        margin="normal"
        value={projectUrl}
        onChange={(e) => setProjectUrl(e.target.value)}
      />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Proje Görseli</Typography>
      {imageUrl && !imageFile && (
        <Box sx={{ my: 2 }}>
          <img src={imageUrl} alt="Mevcut görsel" width="150" />
        </Box>
      )}
      <Button variant="outlined" component="label" sx={{ mt: 1 }}>
        {imageFile ? imageFile.name : (isEditing ? 'Görseli Değiştir' : 'Görsel Seç')}
        <input 
          type="file" 
          hidden 
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </Button>

      <Box sx={{ mt: 3, position: 'relative' }}>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={isLoading}
          fullWidth
        >
          {isEditing ? 'Güncelle' : 'Ekle'}
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
      {isEditing && (
          <Button 
            onClick={() => onComplete()} 
            color="secondary" 
            sx={{mt: 1}}
          >
            İptal
          </Button>
      )}
    </Box>
  );
}