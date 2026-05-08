import React from "react";
import PipingDecorations from "../decoration";
import DrapageVague from "./Pring";
import ChocolateDrip from "./ChoclateDrip";
export default function DecorLayer({ decor, radius, height }) {
  const types = Array.isArray(decor?.types) ? decor.types : [];

  return (
    <>
      {/* 🍥 POUCHAGE */}
     {types.includes("pouchage 1") && (
  <>
    <PipingDecorations
      radius={radius - 0.05}
      y={height}
      count={50}
      color={decor?.colors?.["pouchage 1"] || "#C8194A"}
    />

    <PipingDecorations
      radius={radius + 0.02}
      y={0}
      count={50}
      color={decor?.colors?.["pouchage 1"] || "#C8194A"}
    />
  </>
)}

      {/* 🎂 DÉCORATION DE GÂTEAU (TON DRAPAGE) */}
    
    
   {/* DRIP */}
 {types.includes("Chocolate") && (
        <ChocolateDrip radius={radius} height={height} />
      )}
    </>
  );
}