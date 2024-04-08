"use client";

import { MapObjectData } from "@/types";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useRef } from "react";
import { Mesh } from "three";

type CelestialBodyProps = {
  name: string;
  texture: any;
  emissive?: number;
  emissiveIntensity?: number;
  positionX: number;
  positionZ: number;
  scale?: number;
  rotationSpeed: number;
  unclickable?: boolean;
  setObjectData: Dispatch<SetStateAction<MapObjectData | undefined>>;
};

const CelestialBody = ({
  name,
  texture,
  emissive,
  emissiveIntensity,
  positionX,
  positionZ,
  scale,
  rotationSpeed,
  unclickable,
  setObjectData,
}: CelestialBodyProps) => {
  const { gl } = useThree();
  const bodyRef = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    bodyRef.current.rotation.y += delta * rotationSpeed;
  });

  const handleSelect = () => {
    setObjectData((prev) => ({
      ...prev,
      name: name,
      position: [positionX, positionZ],
    }));
  };

  return (
    <>
      <mesh
        ref={bodyRef}
        position-x={positionX}
        position-z={positionZ}
        scale={scale}
        onClick={(e) => {
          if (unclickable) return;
          e.stopPropagation();
          handleSelect();
        }}
        onPointerEnter={() => {
          if (unclickable) return;
          gl.domElement.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          if (unclickable) return;
          gl.domElement.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </>
  );
};

export default CelestialBody;
