import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import DrapageVague from "../components/decorations/Pring";

/* ───── pouchage pearls (fixed alignment) ───── */
function PouchageRing({
  radius = 1.2,
  y = 0.52, // 🔥 lowered for better contact with cake
  count = 100,
  color = "#C8194A",
}) {
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              y,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ───── cake base ───── */
function CakeBase() {
  return (
    <mesh castShadow receiveShadow position={[0, -0.01, 0]}>
      {/* slight sink avoids "hovering" effect */}
      <cylinderGeometry args={[1.2, 1.2, 1.2, 64]} />
      <meshStandardMaterial color="#f5e6c8" roughness={0.6} />
    </mesh>
  );
}

/* ───── hero cake ───── */
function HeroCake() {
  return (
    <group>
      {/* base cake */}
      <CakeBase />

      {/* ───── middle icing layer ───── */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.4, 64]} />
        <meshStandardMaterial color="#fff1f4" roughness={0.3} />
      </mesh>

      {/* ───── drapage (FIXED height) ───── */}
      <group position={[0, 0.6, 0]}>
        <DrapageVague radius={1.22} height={0.04} color="#b62863" />
      </group>

      {/* ───── pouchage pearls (FIXED height) ───── */}
       <PouchageRing radius={1.22} y={-0.58} color="#C8194A" />
              <PouchageRing radius={1.20} y={0.6} color="#C8194A" />

    </group>
  );
}

/* ───── SCENE ───── */
export default function HeroCakeScene() {
  return (
    <div style={{ width: "100%", height: "420px" }}>
      <Canvas camera={{ fov: 50 }}>
        <Environment preset="studio" />

        {/* lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 2]} intensity={1} />

        {/* cake (NO FLOAT → fixes drifting issue) */}
        <HeroCake />

        {/* shadows grounded properly */}
        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.5}
          scale={10}
          blur={2.5}
        />

        {/* auto rotation ONLY */}
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