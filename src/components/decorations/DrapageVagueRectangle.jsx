import React, { useMemo } from "react";
import * as THREE from "three";

export default function DrapageVagueRectangle({
  width,
  depth,
  height,
  color = "yellow",
}) {
  const curvePoints = useMemo(() => {
    const pts = [];

    const segments = 25;
    const waveDepth = 0.08;
    const offset = 0.05;

    // ----- FACE AVANT
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;

      const x = -width / 2 + t * width;
      const z = depth / 2 + offset;

      const y =
        height -
        0.08 -
        Math.abs(Math.sin(t * Math.PI * 6)) *
          waveDepth;

      pts.push(new THREE.Vector3(x, y, z));
    }

    // ----- DROITE
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;

      const x = width / 2 + offset;
      const z = depth / 2 - t * depth;

      const y =
        height -
        0.08 -
        Math.abs(Math.sin(t * Math.PI * 6)) *
          waveDepth;

      pts.push(new THREE.Vector3(x, y, z));
    }

    // ----- ARRIÈRE
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;

      const x = width / 2 - t * width;
      const z = -depth / 2 - offset;

      const y =
        height -
        0.08 -
        Math.abs(Math.sin(t * Math.PI * 6)) *
          waveDepth;

      pts.push(new THREE.Vector3(x, y, z));
    }

    // ----- GAUCHE
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;

      const x = -width / 2 - offset;
      const z = -depth / 2 + t * depth;

      const y =
        height -
        0.08 -
        Math.abs(Math.sin(t * Math.PI * 6)) *
          waveDepth;

      pts.push(new THREE.Vector3(x, y, z));
    }

    return pts;
  }, [width, depth, height]);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(curvePoints, true),
    [curvePoints]
  );

  return (
    <mesh>
      <tubeGeometry
        args={[curve, 200, 0.05, 8, true]}
      />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
      />
    </mesh>
  );
}