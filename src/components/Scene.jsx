import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import AutoFitCamera from "./AutoFitCamera";
import { RotateCw, Pause } from "lucide-react";
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

function Plate({ children }) {
  const groupRef = useRef();

  const [plateData, setPlateData] = useState({
    shape: "round",
    width:10,
    depth: 10,
    y: -0.5,
  });

  useEffect(() => {
    if (!groupRef.current) return;

    const box = new THREE.Box3().setFromObject(groupRef.current);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const margin = 0.8;
    const plateHeight = 0.08;

    const isRound = Math.abs(size.x - size.z) < 0.09;

    const bottom = box.min.y;

    if (isRound) {
      setPlateData({
        shape: "round",
        width: Math.max(size.x, size.z) + margin,
        depth: Math.max(size.x, size.z) + margin,
        y: bottom - plateHeight / 2,
      });
    } else {
      setPlateData({
        shape: "rectangle",
        width: size.x + margin,
        depth: size.z + margin,
        y: bottom - plateHeight ,
      });
    }
  }, [children]);

  return (
    
<>
  <group ref={groupRef}>{children}</group>

  <AutoFitCamera targetRef={groupRef} />
<mesh
  position={[0, plateData.y, 0]}
  rotation={plateData.shape === "round" ? [0, 0, 0] : [0, 0, 0]}
  receiveShadow
>
  {plateData.shape === "round" ? (
    <cylinderGeometry args={[plateData.width / 2, plateData.width / 2, 0.08, 84]} />
  ) : (
    <boxGeometry args={[plateData.width, 0.08, plateData.depth]} />
  )}

  <meshStandardMaterial
    color="#f5f5f5"
    roughness={0.3}
    metalness={0.2}
  />
</mesh>
    </>
  );
}

export default function CakeScene({ children }) {
  const [autoRotate, setAutoRotate] = useState(true);
  return (
    <div style={{ width: "100%", height: "300px",position: "relative" }}>
     <button
  onClick={() => setAutoRotate((prev) => !prev)}
  style={{
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    background: "white",
    border: "1px solid #E5E7EB",
    padding: "8px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  }}
>
  {autoRotate ? (
    <Pause size={18} color="#C8194A" />
  ) : (
    <RotateCw size={18} color="#C8194A" />
  )}
</button>
<Canvas camera={{ fov: 60 }}>        <Environment preset="city" />

        <ambientLight intensity={0.5} />

        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          castShadow
        />

     <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
          <Plate>{children}</Plate>
        </Float>

        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={4}
        />
<OrbitControls
  makeDefault
  enableZoom={true}
  minDistance={2}
  maxDistance={10}
  minPolarAngle={Math.PI / 3}
  maxPolarAngle={Math.PI / 2.2}

  autoRotate={autoRotate}
  autoRotateSpeed={1.5}

  onStart={() => setAutoRotate(false)}
/>
      </Canvas>
    </div>
  );
}