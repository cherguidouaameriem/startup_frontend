import React, { useMemo } from "react";
import * as THREE from "three";
import DrapageVague from "../decorations/Pring";

/* -------------------- DECORATION COMPONENT -------------------- */
function Decoration({
  position,
  size = 0.07,
  color = "#C8194A",
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
    const segments = 16;
    const bevel = 0.11;

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

  /* 🎀 décorations */
  const decoElements = useMemo(() => {
    const items = [];
    const count = 60;

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
      const topRadius = radius - 0.05;

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

/* -------------------- DOUBLE CAKE MODEL -------------------- */
export default function DoubleCake({
  frostingColor,
  decor,
}) {
  const cakeColor = frostingColor || "#FeFFae";

  const getColor = (item, fallback) =>
    decor?.colors?.[item] || fallback;

  // ✅ pouchage
  const isPouchage =
    decor?.types?.includes("pouchage 1");

  return (
    <group position={[0, -0.5, 0]}>
      {/* Bas */}
      <Tier
        radius={1.5}
        height={1.2}
        color={cakeColor}
        roughness={0.6}
        showBaseDecor={isPouchage}
        showTopDecor={false}
        decorColor={getColor(
          "pouchage 1",
          "#C8194A"
        )}
      />

      {/* Drapage bas */}
      {decor?.types?.includes(
        "Décoration de gâteau"
      ) && (
        <DrapageVague
          radius={1.5}
          height={1.2}
          color={getColor(
            "Décoration de gâteau",
            "#f5e6c8"
          )}
        />
      )}

      {/* Haut */}
      <group position={[0, 1.2, 0]}>
        <Tier
          radius={1.1}
          height={1.2}
          color={cakeColor}
          roughness={0.6}
          showBaseDecor={isPouchage}
          showTopDecor={isPouchage}
          decorColor={getColor(
            "pouchage 1",
            "#C8194A"
          )}
        />

        {/* Drapage haut */}
        {decor?.types?.includes(
          "Décoration de gâteau"
        ) && (
          <DrapageVague
            radius={1.1}
            height={1.2}
            color={getColor(
              "Décoration de gâteau",
              "#f5e6c8"
            )}
          />
        )}
      </group>
    </group>
  );
}