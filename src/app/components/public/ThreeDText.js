'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';

// Bu, 3D modelin ışıklarını ve materyalini ayarlayan yardımcı bileşen
function TextContent() {
  // 3D Text'in kullanacağı font (JSON formatında)
  // ÖNEMLİ: Bu fontu /public/fonts/ klasörüne eklemelisiniz.
  const fontUrl = '/fonts/Roboto_Bold.json'; // Bu yolu kendi fontunuzla değiştirin

  return (
    <>
      {/* 3D yazıyı döndürmek için (mause ile) */}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      
      {/* Işıklar */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#c084fc" intensity={2} />
      <pointLight position={[-10, -10, -5]} color="#7e22ce" intensity={1} />

      {/* Yazıyı ortalamak için */}
      <Center>
        <Text3D
          font={fontUrl}
          size={2.5} // Yazı tipi boyutu
          height={0.5} // Yazı tipi kalınlığı (derinlik)
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.1}
          bevelSize={0.05}
          bevelOffset={0}
          bevelSegments={5}
        >
          Umut Karaytu
          {/* "Lüks" metalik mor materyal */}
          <meshStandardMaterial 
            color="#c084fc" 
            metalness={0.8} // Metalik görünüm
            roughness={0.3} // Hafif pürüzlü
          />
        </Text3D>
      </Center>
    </>
  );
}

export default function ThreeDText() {
  return (
    <Box sx={{ 
      height: { xs: '300px', md: '400px' }, // 3D sahne için alan
      width: '100%',
      cursor: 'grab' // Kullanıcıya döndürülebilir olduğunu hissettirir
    }}>
      <Canvas camera={{ position: [0, 1, 8], fov: 50 }}>
        {/* Suspense, 3D model (ve font) yüklenirken bekleme sağlar */}
        <Suspense fallback={null}>
          <TextContent />
        </Suspense>
      </Canvas>
    </Box>
  );
}