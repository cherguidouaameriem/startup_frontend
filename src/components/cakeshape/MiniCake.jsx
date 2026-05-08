import React, { useMemo } from "react";
import * as THREE from "three";
import Topper from "../decorations/Topper";
import DecorLayer from "../decorations/pouchage";
import DrapageVague from "../decorations/Pring";
/* -------------------- TIER -------------------- */
function Tier({ radius, height, color, roughness }) {
  const points = useMemo(() => {
    const pts = [];
    const segments = 16;
    const bevel = 0.11;

    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(radius, 0));
    pts.push(new THREE.Vector2(radius, height - bevel));

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * (Math.PI / 2);
      const x = radius - bevel + Math.cos(angle) * bevel;
      const y = height - bevel + Math.sin(angle) * bevel;
      pts.push(new THREE.Vector2(x, y));
    }

    pts.push(new THREE.Vector2(0, height));
    return pts;
  }, [radius, height]);

  return (
    <mesh castShadow receiveShadow>
      <latheGeometry args={[points, 128]} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={0.05}
       
      />
    </mesh>
  );
}

/* -------------------- MINI CAKE MODEL -------------------- */
export default function MiniCake({ frostingColor, decor }) {
  const cakeColor = frostingColor || "#FeFFae";
  const RADIUS = 0.8;
  const HEIGHT = 0.8;

  const getColor = (item, fallback) =>
    decor?.colors?.[item] || fallback;

  return (
    <group key={JSON.stringify(decor?.colors)} position={[0, -0.5, 0]}>
      
      <Tier radius={RADIUS} height={HEIGHT} color={cakeColor} roughness={0.6} />

      {decor?.types?.includes("Décoration de gâteau") && (
        <DrapageVague
          radius={RADIUS}
          height={HEIGHT}
          color={getColor("Décoration de gâteau", "#f5e6c8")}
        />
      )}

      <Topper cakeRadius={RADIUS} cakeHeight={HEIGHT} />

      <DecorLayer decor={decor} radius={RADIUS} height={HEIGHT} />

      {decor?.types?.includes("Chocolate") && (
        <ChocolateDrip
          radius={RADIUS}
          height={HEIGHT}
          color={getColor("Chocolate", "#4b2c20")}
        />
      )}
    </group>
  );
}