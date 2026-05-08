import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function AutoFitCamera({ targetRef }) {
  const { camera, gl } = useThree();

  useEffect(() => {
    if (!targetRef.current) return;

    const box = new THREE.Box3().setFromObject(targetRef.current);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);

    const fov = camera.fov * (Math.PI / 180);
    let distance = maxDim / (2 * Math.tan(fov / 2));

    distance *= 1.8; // 🔥 zoom factor (adjust this)

    camera.position.set(center.x, center.y + maxDim * 0.5, distance);
    camera.lookAt(center);

    camera.updateProjectionMatrix();
  }, [targetRef, camera]);

  return null;
}