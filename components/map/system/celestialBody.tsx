"use client";

import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

type CelestialBodyProps = {
  texture: any;
  emissive?: number;
  emissiveIntensity?: number;
  positionX?: number;
  positionZ?: number;
  scale?: number;
};

const CelestialBody = ({
  texture,
  emissive,
  emissiveIntensity,
  positionX,
  positionZ,
  scale,
}: CelestialBodyProps) => {
  const { gl } = useThree();

  const handleSelect = () => {
    console.log("null");
  };

  return (
    <>
      <mesh
        position-x={positionX}
        position-z={positionZ}
        scale={scale}
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
        onPointerEnter={() => {
          gl.domElement.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          gl.domElement.style.cursor = "default";
        }}
      >
        <sphereGeometry />
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
