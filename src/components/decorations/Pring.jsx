import React, { useMemo } from "react";
import * as THREE from "three";

export default function DrapageVague({ radius, height, color = "yellow" }) {
  const curvePoints = useMemo(() => {
    const pts = [];
    const segments = 150; // Plus il y en a, plus c'est lisse
    const loops = 100;      // Nombre de "vagues" autour du gâteau
    const waveDepth = -0.02; // Profondeur de la courbe (vers le bas)
    const offsetOut = 0.02; // Pour que ça ne rentre pas dans le gâteau

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      
      // Position X et Z en cercle
      const x = (radius + offsetOut) * Math.cos(theta);
      const z = (radius + offsetOut) * Math.sin(theta);
      
      // Position Y : on utilise Math.abs(Math.sin) pour créer l'effet de feston (vagues pointues en haut)
      // Ou juste Math.sin pour des vagues fluides.
      const y = height - 0.1 - Math.abs(Math.sin(theta * (loops / 2))) * waveDepth;
      
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [radius, height]);

  // On crée un tube le long du chemin tracé
  const curve = useMemo(() => new THREE.CatmullRomCurve3(curvePoints, true), [curvePoints]);

  return (
    <mesh>
      {/* tubeGeometry : [chemin, segments, rayon du tube, segments radiaux, clos] */}
      <tubeGeometry args={[curve, 128, 0.09, 3, true]} />
      <meshStandardMaterial color={color} roughness={0.3} />
    </mesh>
  );
}