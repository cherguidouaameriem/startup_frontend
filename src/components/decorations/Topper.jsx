import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Topper({ cakeHeight = 0.8, scale = 0.3}) {
  const { scene } = useGLTF("/models/bento.glb");
  return (
    <primitive
      object={scene}
     position={[0, cakeHeight / 2 + 0.02, 0]} 
      scale={scale}
    />
  );
}