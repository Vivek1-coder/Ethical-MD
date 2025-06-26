"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import Link from "next/link";

const AnimatedSphere = () => {
  const meshRef = useRef(null);
  const isDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        metalness={0.9}
        roughness={0.15}
        color={isDark ? "#b8c0ff" : "#6c63ff"}
        emissive={isDark ? "#9d4edd" : "#f4f1ff"}
        emissiveIntensity={0.07}
        toneMapped={false}
      />
    </mesh>
  );
};

const CameraFloat = () => {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.4) * 0.25;
    state.camera.position.y = Math.cos(t * 0.3) * 0.25;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const OrbitRing = () => {
  const ringRef = useRef(null);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.7, 3.0, 64]} />
      <meshBasicMaterial
        color={"#ff8fab"}
        side={THREE.DoubleSide}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

export const Hero3D = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center dark:hidden"
        style={{ backgroundImage: "url('/whitebg.png')" }}
      ></div>
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center dark:z-0"
        style={{ backgroundImage: "url('/darkbg.png')" }}
      ></div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 65 }}
          shadows
          gl={{ antialias: true }}
          className="w-full h-[90vh]"
        >
          {/* Depth fog for 3D feel */}
          <fog attach="fog" args={["#0e0e0e", 10, 20]} />

          {/* Soft lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />

          {/* 3D content */}
          {/* <OrbitRing />  */}
          <AnimatedSphere />
          <Sparkles
            count={80}
            speed={0.4}
            scale={6}
            size={1.5}
            color="#ffffff"
          />
          {/* <CameraFloat /> */}

          {/* Reflective ground for immersion */}
          {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, 0]} receiveShadow>
    <planeGeometry args={[100, 100]} />
    <meshStandardMaterial
      color="#111111"
      metalness={0.2}
      roughness={0.9}
      transparent
      opacity={0.1}
      
    />
  </mesh> */}

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
           
          />
        </Canvas>
      </div>

      {/* Text and Buttons */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-10"
        >
          Ethical<span className="text-[#ffbe0b]">MD</span>
        </motion.h1>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#ffbe0b] hover:bg-[#ffd23f] cursor-pointer text-[#3a0ca3] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
          >
            Get Started
          </motion.button>
           </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 hover:bg-white/30 cursor-pointer text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 border border-white/30 shadow-lg"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-[#006d77] rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-[#006d77] rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
