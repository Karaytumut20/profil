// src/app/admin/layout.js
'use client';
import { useState, useEffect } from 'react';
// YOL DÜZELTİLDİ: Bu dosya (admin/layout.js) için doğru yol 2 noktadır.
import { supabase } from '../../lib/supabaseClient'; 
import { useRouter, usePathname } from 'next/navigation';
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CircularProgress, CssBaseline } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <HomeIcon />, path: '/admin/dashboard' },
  { text: 'Profil Yönetimi', icon: <AccountCircleIcon />, path: '/admin/dashboard/profile' },
  { text: 'Proje Yönetimi', icon: <ArticleIcon />, path: '/admin/dashboard/projects' },
  { text: 'Yetenekler', icon: <CodeIcon />, path: '/admin/dashboard/skills' },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); 

  // Login sayfasındaysak (veya alt yollarındaysak)
  const isLoginPage = pathname.startsWith('/admin/login');

  useEffect(() => {
    // 1. Eğer login sayfasındaysak, koruma yapma, loading'i kapat ve formu göster.
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    // 2. Login sayfası DIŞINDA bir sayfadaysak (dashboard, profile vs.)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Oturum yoksa, loading=true kalır (spinner görünür)
        // ve kullanıcı login sayfasına yönlendirilir. Korumalı içerik ASLA render edilmez.
        router.replace('/admin/login');
      } else {
        // Oturum varsa, kullanıcıyı set et ve loading'i kapat (dashboard'u göster).
        setUser(session.user);
        setLoading(false);
      }
    };
    checkSession();
  }, [router, pathname, isLoginPage]);

  // Çıkış yapma fonksiyonu
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  // Oturum kontrol edilirken veya başarısız olup yönlendirilirken spinner göster.
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Loading bittiyse VE login sayfasındaysak (Layout'u gösterme, sadece formu göster)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading bittiyse VE oturum varsa (Dashboard ve menüleri göster)
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Portfolyo Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => router.push(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          {/* LOGOUT BUTONU EKLENDİ */}
          <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{color: 'error.main'}}>
                <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
                <ListItemText primary="Çıkış Yap" />
              </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, minHeight: '100vh' }}
      >
        <Toolbar /> 
        {children}
      </Box>
    </Box>
  );
}