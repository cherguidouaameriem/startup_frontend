import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 👉 chocolat uniquement
function createSpongeTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#8b5a3c";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = "rgba(30,15,5,0.35)";
    ctx.fillRect(x, y, 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 2);
  return texture;
}

function LayeredCake() {
  const sponge = useMemo(() => createSpongeTexture(), []);

  return (
    <mesh position={[0, 0, 0]} castShadow>
      <boxGeometry args={[3, 1, 2]} />
      <meshStandardMaterial map={sponge} roughness={0.95} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <LayeredCake />
      <OrbitControls />
    </>
  );
}

export default function ChocolateCake() {
  return (
    <Canvas camera={{ position: [5, 3, 5] }}>
      <Scene />
    </Canvas>
  );
}