// src/app/page.js
import { supabase } from '../lib/supabaseClient'; // Bu yol doğru (src/lib içinde)
import { Container, Box } from '@mui/material';

// Yollar './' (aynı dizin) olmalı ve eksik ContactForm eklenmeli
import Navbar from './components/public/Navbar';
import Hero from './components/public/Hero';
import ProjectsGrid from './components/public/ProjectsGrid';
import Skills from './components/public/Skills';
import ContactForm from './components/public/ContactForm'; // <-- EKSİK IMPORT EKLENDİ
import Footer from './components/public/Footer';

// Verileri sunucuda paralel olarak çek
async function getPageData() {
  const profileReq = supabase.from('profile').select('*').limit(1).single();
  const projectsReq = supabase.from('projects').select('*').order('created_at', { ascending: false });
  const skillsReq = supabase.from('skills').select('*');

  const [
    { data: profile, error: profileError },
    { data: projects, error: projectsError },
    { data: skills, error: skillsError }
  ] = await Promise.all([profileReq, projectsReq, skillsReq]);

  if (profileError || projectsError || skillsError) {
    console.error("Veri çekme hatası:", profileError || projectsError || skillsError);
  }
  
  return { profile, projects: projects || [], skills: skills || [] };
}


export default async function HomePage() {
  const { profile, projects, skills } = await getPageData();

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      <Navbar />
      
      <main>
        {/* Bölüm 1: Hero (Profil Bilgileri) - Geri eklendi */}
        {profile && <Hero profile={profile} />}
        
        {/* Bölüm 2: Projeler (Kartlar) */}
        <ProjectsGrid projects={projects} />

        {/* Bölüm 3: Yetenekler */}
        <Skills skills={skills} />
        
        {/* Bölüm 4: İletişim - Geri eklendi */}
        <ContactForm /> 
      </main>

      <Footer />
    </Box>
  );
}