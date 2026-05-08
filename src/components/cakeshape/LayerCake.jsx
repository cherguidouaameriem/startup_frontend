import React, { useMemo } from "react";
import * as THREE from "three";
import DrapageVague from "../decorations/Pring";

/* -------------------- DECORATION COMPONENT -------------------- */
function Decoration({
  position,
  size = 0.07,
  color = "yellow",
}) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        roughness={0.4}
      />
    </mesh>
  );
}

/* -------------------- TIER -------------------- */
function Tier({
  radius,
  height,
  color,
  roughness,
  showBaseDecor,
  showTopDecor,
  decorColor,
}) {
  const points = useMemo(() => {
    const pts = [];
    const segments = 10;
    const bevel = 0.12;

    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(radius, 0));
    pts.push(
      new THREE.Vector2(radius, height - bevel)
    );

    for (let i = 0; i <= segments; i++) {
      const angle =
        (i / segments) * (Math.PI / 2);

      const x =
        radius - bevel + Math.cos(angle) * bevel;

      const y =
        height - bevel + Math.sin(angle) * bevel;

      pts.push(new THREE.Vector2(x, y));
    }

    pts.push(new THREE.Vector2(0, height));

    return pts;
  }, [radius, height]);

  const decoElements = useMemo(() => {
    const items = [];
    const count = 50;

    // BASE
    if (showBaseDecor) {
      const baseRadius = radius + 0.02;

      for (let i = 0; i < count; i++) {
        const angle =
          (i / count) * Math.PI * 2;

        items.push({
          pos: [
            Math.cos(angle) * baseRadius,
            0.05,
            Math.sin(angle) * baseRadius,
          ],
          id: `base-${i}`,
        });
      }
    }

    // TOP
    if (showTopDecor) {
      const topRadius = radius - 0.06;

      for (let i = 0; i < count; i++) {
        const angle =
          (i / count) * Math.PI * 2;

        items.push({
          pos: [
            Math.cos(angle) * topRadius,
            height,
            Math.sin(angle) * topRadius,
          ],
          id: `top-${i}`,
        });
      }
    }

    return items;
  }, [
    radius,
    height,
    showBaseDecor,
    showTopDecor,
  ]);

  return (
    <group>
      {/* 🎂 gâteau */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 128]} />

        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={0.05}
        />
      </mesh>

      {/* 🎀 pouchage */}
      {decoElements.map((item) => (
        <Decoration
          key={item.id}
          position={item.pos}
          color={decorColor}
        />
      ))}
    </group>
  );
}

/* -------------------- LAYER CAKE -------------------- */
export default function LayerCake({
  frostingColor,
  decor,
}) {
  const cakeColor = frostingColor || "#FeFFae";

  const radius = 0.7;
  const height = 1.7;

  const getColor = (item, fallback) =>
    decor?.colors?.[item] || fallback;

  // ✅ pouchage
  const isPouchage =
    decor?.types?.includes("pouchage 1");

  return (
    <group position={[0, -0.5, 0]}>
      <Tier
        radius={radius}
        height={height}
        color={cakeColor}
        roughness={0.2}
        showBaseDecor={isPouchage}
        showTopDecor={isPouchage}
        decorColor={getColor(
          "pouchage 1",
          "#C8194A"
        )}
      />

      {/* 🎀 drapage vague */}
      {decor?.types?.includes(
        "Décoration de gâteau"
      ) && (
        <DrapageVague
          radius={radius}
          height={height}
          color={getColor(
            "Décoration de gâteau",
            "#f5e6c8"
          )}
        />
      )}
    </group>
  );
}