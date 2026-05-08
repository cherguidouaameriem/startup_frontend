import React, { useMemo } from "react";
import * as THREE from "three";

function PipingDecorations({ radius = 0.2, count = 18 }) {
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      arr.push([x, 0.45, z]);
    }
    return arr;
  }, [radius, count]);

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          {/* petite rosette / crème */}
          <sphereGeometry args={[0.05, 20, 19]} />
        </mesh>
      ))}
    </group>
  );
}

export default PipingDecorations;