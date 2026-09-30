import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles as SparklesIcon, Compass, Shield } from 'lucide-react';

// Procedural 3D Vidyalaya Medallion Crest
function CrestMedallion() {
  const meshRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Subtle floating and gentle rotational response to interaction
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle idle spin with slight mouse tilt
      const targetY = (state.pointer.x * Math.PI) / 8;
      const targetX = (-state.pointer.y * Math.PI) / 8;
      meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetY + (hovered ? 0.4 : 0), 2.5, delta);
      meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetX, 2.5, delta);
    }

    if (flameRef.current) {
      // Subtle pulse on the Diya flame
      const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.08;
      flameRef.current.scale.set(s, s * 1.1, s);
    }
  });

  return (
    <group 
      ref={meshRef} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      scale={hovered ? [1.08, 1.08, 1.08] : [1, 1, 1]}
    >
      {/* Outer Golden Fluted Rim */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.22, 64]} />
        <meshStandardMaterial 
          color="#DF711B" 
          metalness={0.88} 
          roughness={0.24} 
        />
      </mesh>

      {/* Raised Inner Rim */}
      <mesh position={[0, 0, 0.12]}>
        <torusGeometry args={[1.95, 0.1, 16, 64]} />
        <meshStandardMaterial 
          color="#FFB740" 
          metalness={0.92} 
          roughness={0.18} 
        />
      </mesh>

      {/* Deep Navy Emblem Backplate */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[1.9, 1.9, 0.2, 64]} />
        <meshStandardMaterial 
          color="#0B1D30" 
          metalness={0.3} 
          roughness={0.4} 
        />
      </mesh>

      {/* Lotus Petal Ring (8 procedural petals) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        return (
          <mesh 
            key={i} 
            position={[Math.cos(angle) * 1.35, Math.sin(angle) * 1.35, 0.16]}
            rotation={[0, 0, angle + Math.PI / 2]}
            scale={[0.35, 0.65, 0.08]}
          >
            <coneGeometry args={[1, 1, 16]} />
            <meshStandardMaterial 
              color="#FFC043" 
              metalness={0.7} 
              roughness={0.3} 
            />
          </mesh>
        );
      })}

      {/* Sacred Diya / Lamp Base */}
      <mesh position={[0, -0.4, 0.22]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.9, 0.45, 32]} />
        <meshStandardMaterial 
          color="#E58A2B" 
          metalness={0.85} 
          roughness={0.2} 
        />
      </mesh>

      {/* Sacred Flame (Glowing Gold-Orange) */}
      <mesh ref={flameRef} position={[0, 0.2, 0.25]}>
        <sphereGeometry args={[0.42, 32, 16]} />
        <meshStandardMaterial 
          color="#FFF0A0" 
          emissive="#DF711B" 
          emissiveIntensity={0.85} 
          roughness={0.1} 
        />
      </mesh>

      {/* Top Flame Tip */}
      <mesh position={[0, 0.65, 0.25]}>
        <coneGeometry args={[0.26, 0.6, 24]} />
        <meshStandardMaterial 
          color="#FFA500" 
          emissive="#DF711B" 
          emissiveIntensity={0.7} 
          roughness={0.15} 
        />
      </mesh>

      {/* Om / Radiance Halo Ring */}
      <mesh position={[0, 0.2, 0.18]}>
        <torusGeometry args={[0.7, 0.04, 16, 48]} />
        <meshStandardMaterial 
          color="#FFE082" 
          metalness={0.9} 
          roughness={0.15} 
        />
      </mesh>
    </group>
  );
}

export const VidyalayaCrest3D: React.FC<{ className?: string }> = ({ className = 'h-[360px] sm:h-[420px]' }) => {
  const [hasWebGlError, setHasWebGlError] = useState(false);

  if (hasWebGlError) {
    return (
      <div className={`relative flex items-center justify-center p-8 bg-gradient-to-br from-[#0B1D30] to-[#162A45] rounded-3xl border border-[#DF711B]/30 shadow-2xl ${className}`}>
        <div className="text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-[#DF711B]/20 border border-[#DF711B]/40 flex items-center justify-center mx-auto text-[#FFB740]">
            <Shield className="w-12 h-12" />
          </div>
          <h4 className="font-cinzel text-xl font-bold text-white tracking-wide">Chinmaya Vidyalaya Emblem</h4>
          <p className="text-xs text-amber-100/70 max-w-xs mx-auto">
            Gyan Yagna & Character Building Under Pujya Gurudev Swami Chinmayananda
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden bg-radial from-[#15273C] via-[#0B1D30] to-[#060F1A] border border-[#DF711B]/30 shadow-2xl select-none ${className}`}>
      {/* Ambient Radial Vignette & Branding Top Pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1D30]/80 backdrop-blur-md border border-[#DF711B]/40 text-[#FFB740] text-[11px] font-bold tracking-wider uppercase">
        <SparklesIcon className="w-3.5 h-3.5 text-[#DF711B] animate-spin" style={{ animationDuration: '6s' }} />
        <span>Interactive 3D Emblem</span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-xs text-amber-200/60 font-sans">
        <Compass className="w-3.5 h-3.5 text-[#DF711B]" />
        <span className="hidden sm:inline">Drag to Orbit / Hover to Inspect</span>
      </div>

      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-amber-200/80">
            <div className="w-8 h-8 border-2 border-[#DF711B] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs uppercase tracking-widest font-sans">Loading 3D Crest...</span>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 45 }}
          onError={() => setHasWebGlError(true)}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFF8E7" />
          <directionalLight position={[-4, -3, -2]} intensity={0.6} color="#DF711B" />
          <pointLight position={[0, 0.4, 1.5]} intensity={1.5} color="#FFB740" distance={6} />

          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
            <CrestMedallion />
          </Float>

          {/* Golden Spiritual Dust Particles */}
          <Sparkles 
            count={40} 
            scale={5} 
            size={2.2} 
            speed={0.4} 
            color="#FFC043" 
            opacity={0.6} 
          />

          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.3}
            minPolarAngle={Math.PI / 2 - 0.3}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
          />
        </Canvas>
      </Suspense>

      {/* Bottom Subtitle Caption */}
      <div className="absolute bottom-4 inset-x-4 z-10 text-center pointer-events-none">
        <p className="font-cinzel text-xs sm:text-sm font-semibold text-white/90 drop-shadow">
          Chinmaya Vidyalaya Tarapur • Knowledge & Character
        </p>
        <p className="text-[10px] text-amber-200/60 uppercase tracking-widest font-sans mt-0.5">
          CBSE Affiliated No. 1130095 • Est. 1995
        </p>
      </div>
    </div>
  );
};
