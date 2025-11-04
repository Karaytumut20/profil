'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Sparkles } from '@react-three/drei';
import { Box } from '@mui/material';

// Bu, 3D modelimizin tüm mantığını içerir
function SceneContent() {

  // --- EN ÖNEMLİ DÜZELTME BURADA ---
  // Projenize font eklemenize gerek yok.
  // Bu "normal" fontu direkt internetten çekeceğiz.
  const fontPath = 'https://fonts.gstatic.com/s/raleway/v14/1Ptug8zYS_SKggPNyC0ITw.woff';

  return (
    <>
      {/* Fare ile döndürme (kaydırma) ayarı */}
      <OrbitControls 
        enableZoom={false} // Yakınlaştırma kapalı
        enablePan={false}  // Sağa sola sürükleme kapalı
        autoRotate        // Kendi etrafında dönsün
        autoRotateSpeed={0.5} // Yavaşça
      />
      
      {/* Lüks Mor Işıklar */}
      <ambientLight intensity={0.5} />
      <pointLight 
        position={[10, 10, 10]} 
        color="#c084fc" // Ana mor (Primary)
        intensity={2} 
      />
      <pointLight 
        position={[-10, -10, -5]} 
        color="#7e22ce" // Koyu mor (Secondary)
        intensity={1} 
      />

      {/* 3D YAZI */}
      <Text
        font={fontPath}
        fontSize={1.8} // Boyutu biraz ayarladım
        anchorX="center"
        anchorY="middle"
        position={[0, 0.5, 0]} // Ekranda biraz yukarı aldım
      >
        Umut Karaytu
        {/* "Lüks" metalik mor materyal */}
        <meshStandardMaterial 
          color="#c084fc" 
          metalness={0.8} 
          roughness={0.3} 
        />
      </Text>

      {/* Kar Yağışı Efekti */}
      <Sparkles
        count={600}
        speed={0.1}
        opacity={0.7}
        color="#ffffff"
        size={1.5}
        scale={[15, 15, 15]}
      />
    </>
  );
}

// Bu ana bileşen, 3D sahneyi sayfaya yerleştirir
export default function HeroScene() {
  return (
    <Box sx={{
      height: { xs: '300px', md: '450px' },
      width: '100%',
      cursor: 'grab',
      touchAction: 'none',
    }}>
      <Canvas camera={{ position: [0, 0.5, 10], fov: 50 }}> 
        {/* Kamerayı biraz geriye çektim */}
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </Box>
  );
}