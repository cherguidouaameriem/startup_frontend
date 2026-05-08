import React, { useMemo } from "react";
import * as THREE from "three";

const ChocolateDrip = ({ radius, height, color = "#3D1E16" }) => {
  const dripShader = useMemo(() => ({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
    },
    vertexShader: `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        vec3 pos = position;

        // 1. Create multiple layers of sine waves for variety
        float freq = 25.0;
        float wave = sin(uv.x * freq) * 0.15;
        wave += sin(uv.x * freq * 2.3) * 0.05; // Adds smaller details
        wave += sin(uv.x * freq * 0.4) * 0.1;  // Adds variation in long/short drips
        
        // 2. The "Sharpening" trick: 
        // We only move the vertices down if the wave value is below a certain point
        // This creates the distinct 'droplet' look from your photo
        float dripEffect = min(0.0, wave); 

        // Apply only to the bottom of the cylinder ring
        if (uv.y < 0.5) {
          pos.y += dripEffect - 0.1; 
        }

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        // Simple darkening toward the bottom of the drip for depth
        float depth = smoothstep(1.0, 0.0, vUv.y);
        gl_FragColor = vec4(uColor * (0.8 + depth * 0.2), 1.0);
      }
    `
  }), [color]);

  return (
    <group position={[0, height, 0]}>
      {/* The Top Cap (Smooth and Shiny) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} castShadow>
        <circleGeometry args={[radius , 128]} />
        <meshStandardMaterial 
          color={color} 
          roughness={16} // Lower roughness = more like the photo's shine
          metalness={0.2} 
        />
      </mesh>

      {/* The Side Drips */}
      <mesh position={[0, -0.15, 0]}>
        {/* Increased height to 0.5 to allow for those long drips in the photo */}
        <cylinderGeometry args={[radius + 0.01, radius + 0.021, 0.34, 256, 15, true]} />
        <shaderMaterial
          args={[dripShader]}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default ChocolateDrip;