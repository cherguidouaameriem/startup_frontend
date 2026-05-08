import React, { useMemo } from "react";
import DrapageVagueRectangle from "../decorations/DrapageVagueRectangle";
export default function RectangleCake({ frostingColor, decor }) {
  const WIDTH = 3;
  const HEIGHT = 0.8;
  const DEPTH = 2;

  // 🔥 positions propres sur les bords (rectangle, pas cercle)
 const calculateEdgePositions = (w, d, yPos) => {
  const arr = [];
  const offset = 0.05;

  // 🔥 density control (like "segments")
  const density = 10; 
  // ↑ increase this = more spheres (try 20–30 for very tight piping)

  const countX = Math.floor(w * density);
  const countZ = Math.floor(d * density);

  // --- côtés X (avant / arrière)
  for (let i = 0; i <= countX; i++) {
    const x = -w / 2 + (i / countX) * w;

    arr.push([x, yPos, d / 2 + offset]);
    arr.push([x, yPos, -d / 2 - offset]);
  }

  // --- côtés Z (gauche / droite)
  for (let i = 0; i <= countZ; i++) {
    const z = -d / 2 + (i / countZ) * d;

    arr.push([w / 2 + offset, yPos, z]);
    arr.push([-w / 2 - offset, yPos, z]);
  }

  return arr;
};

  const topPositions = useMemo(
    () => calculateEdgePositions(WIDTH, DEPTH, HEIGHT / 2),
    []
  );

  const bottomPositions = useMemo(
    () => calculateEdgePositions(WIDTH, DEPTH, -HEIGHT / 2),
    []
  );

  const getColor = (item, fallback) =>
    decor?.colors?.[item] || fallback;

  return (
    <group position={[0, -0.01, 0]}>
      
      {/* 🎂 CAKE */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        <meshStandardMaterial
          color={frostingColor}
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* 🎀 POUCHAGE */}
      {decor?.types?.includes("pouchage 1") && (
        <>
          {/* HAUT */}
          <group>
            {topPositions.map((pos, i) => (
<mesh key={`top-${i}`} position={pos} castShadow={false} receiveShadow={false}>                <sphereGeometry args={[0.07, 16, 16]} />
                <meshStandardMaterial
                  color={getColor("pouchage 1", "#C8194A")}
                  roughness={0.4}
                />
              </mesh>
            ))}
          </group>

          {/* BAS */}
          <group>
            {bottomPositions.map((pos, i) => (
              <mesh key={`bottom-${i}`} position={pos} castShadow>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshStandardMaterial
                  color={getColor("pouchage 1", "#C8194A")}
                  roughness={0.4}
                />
              </mesh>
            ))}
       
          </group>
          
        </>
      )}<group>{decor?.types?.includes("Décoration de gâteau") && (
  <DrapageVagueRectangle
    width={WIDTH}
    depth={DEPTH}
    height={HEIGHT / 2}
    color={getColor("Décoration de gâteau", "#f5e6c8")}
  />
)}</group>
    </group>
  );
}