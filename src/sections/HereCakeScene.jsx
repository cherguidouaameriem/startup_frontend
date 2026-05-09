import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";

import * as THREE from "three";

/* -------------------- DRAPAGE -------------------- */
function DrapageVague({
  radius,
  height,
  color = "#fff4c7",
}) {
  const curvePoints = useMemo(() => {
    const pts = [];
    const segments = 180;
    const loops = 60;
    const waveDepth = -0.04;
    const offsetOut = 0.02;

    for (let i = 0; i <= segments; i++) {
      const theta =
        (i / segments) * Math.PI * 2;

      const x =
        (radius + offsetOut) *
        Math.cos(theta);

      const z =
        (radius + offsetOut) *
        Math.sin(theta);

      const y =
        height -
        0.08 -
        Math.abs(
          Math.sin(theta * (loops / 2))
        ) *
          waveDepth;

      pts.push(new THREE.Vector3(x, y, z));
    }

    return pts;
  }, [radius, height]);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        curvePoints,
        true
      ),
    [curvePoints]
  );

  return (
    <mesh>
      <tubeGeometry
        args={[curve, 128, 0.05, 8, true]}
      />

      <meshStandardMaterial
        color={color}
        roughness={0.3}
      />
    </mesh>
  );
}

/* -------------------- PEARLS -------------------- */
function Pearl({
  position,
  color = "#C8194A",
  size = 0.066,
}) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[size, 16, 16]} />

      <meshStandardMaterial
        color={color}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

/* -------------------- CANDLE -------------------- */
function Candle({
  position,
  candleColor = "#ffffff",
  flameColor = "#ffb347",
}) {
  return (
    <group position={position}>
      {/* candle body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.35, 16]} />
        <meshStandardMaterial
          color={candleColor}
          roughness={0.4}
        />
      </mesh>

      {/* flame */}
      <mesh position={[0, 0.24, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial
          color={flameColor}
          emissive={flameColor}
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

/* -------------------- CAKE TIER -------------------- */
function Tier({
  radius,
  height,
  color,
  pearlColor,
}) {
  const points = useMemo(() => {
    const pts = [];
    const segments = 18;
    const bevel = 0.12;

    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(radius, 0));

    pts.push(
      new THREE.Vector2(
        radius,
        height - bevel
      )
    );

    for (let i = 0; i <= segments; i++) {
      const angle =
        (i / segments) * (Math.PI / 2);

      const x =
        radius -
        bevel +
        Math.cos(angle) * bevel;

      const y =
        height -
        bevel +
        Math.sin(angle) * bevel;

      pts.push(new THREE.Vector2(x, y));
    }

    pts.push(new THREE.Vector2(0, height));

    return pts;
  }, [radius, height]);

  const pearls = useMemo(() => {
    const items = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      const angle =
        (i / count) * Math.PI * 2;

      items.push({
        id: i,
        position: [
          Math.cos(angle) * (radius + 0.02),
          0.05,
          Math.sin(angle) * (radius + 0.02),
        ],
      });
    }

    return items;
  }, [radius]);

  return (
    <group>
      {/* cake */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 128]} />

        <meshStandardMaterial
          color={color}
          roughness={0.55}
          metalness={0.03}
        />
      </mesh>

      {/* pearls */}
      {pearls.map((item) => (
        <Pearl
          key={item.id}
          position={item.position}
          color={pearlColor}
        />
      ))}
    </group>
  );
}

/* -------------------- READY CAKE -------------------- */
function ReadyCake() {
  const cakeColor = "#fff1b8";
  const pearlColor = "#C8194A";
  const drapageColor = "#C8194A";

  return (
    <group position={[0, -0.8, 0]}>
      {/* bottom tier */}
      <Tier
        radius={1.5}
        height={1.2}
        color={cakeColor}
        pearlColor={pearlColor}
      />

      {/* drapage */}
      <DrapageVague
        radius={1.5}
        height={1.2}
        color={drapageColor}
      />

      {/* top tier */}
      <group position={[0, 1.2, 0]}>
        <Tier
          radius={1.1}
          height={1.1}
          color={cakeColor}
          pearlColor={pearlColor}
        />

        {/* drapage top */}
        <DrapageVague
          radius={1.1}
          height={1.1}
          color={drapageColor}
        />

        {/* candles */}
        <Candle position={[0, 1.2, 0]} />

        <Candle
          position={[0.25, 1.15, 0.1]}
          candleColor="#ffd6e7"
        />

        <Candle
          position={[-0.25, 1.15, -0.05]}
          candleColor="#ffffff"
        />

        <Candle
          position={[0.05, 1.18, -0.22]}
          candleColor="#ffe8a3"
        />
      </group>
    </group>
  );
}

/* -------------------- HERO SCENE -------------------- */
export default function HeroCakeScene() {
  return (
    <div
      style={{
        width: "100%",
        height: "420px",
      }}
    >
      <Canvas
        shadows
        camera={{
          position: [0, 2, 6],
          fov: 45,
        }}
      >
        {/* lights */}
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={1.4}
          castShadow
        />

        {/* environment */}
        <Environment preset="city" />

        {/* cake */}
        <ReadyCake />

        {/* shadows */}
        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.45}
          scale={10}
          blur={2.5}
        />

        {/* controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
        />
      </Canvas>
    </div>
  );
}