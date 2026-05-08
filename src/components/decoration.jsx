import React, { useMemo } from "react";

function PipingDecorations({
  radius = 0.9,
  count = 40,
  y = 0.8,
  color = "#C8194A",
}) {
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      arr.push([x, y, z]);
    }
    return arr;
  }, [radius, count, y]);

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export default PipingDecorations;