"use client";

import { useRef } from "react";
import { Color } from "three";

type CelestialBodyProps = {
  texture: any;
  emissive?: number;
  emissiveIntensity?: number;
  positionX?: number;
};

const CelestialBody = ({
  texture,
  emissive,
  emissiveIntensity,
  positionX,
}: CelestialBodyProps) => {
  const sunMesh = useRef();

  return (
    <>
      <mesh ref={sunMesh} position-x={positionX}>
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
