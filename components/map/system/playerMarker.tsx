"use client";

import { MapObjectData } from "@/types";
import { useFrame } from "@react-three/fiber";
import { dir } from "console";
import { useRef } from "react";
import { MathUtils, Mesh, Vector2, Vector3 } from "three";

type playerMarkerProps = {
  objectData: MapObjectData | undefined;
  travelling: boolean;
};

const PlayerMarker = ({ objectData, travelling }: playerMarkerProps) => {
  const bodyRef = useRef<Mesh>(null!);

  const currentPos = new Vector2(5, 5);
  const targetPos = new Vector2(
    objectData?.position[0],

    objectData?.position[1]
  );

  const targetX = objectData?.position[0];
  const targetY = objectData?.position[1];

  const distance = currentPos.distanceTo(targetPos);
  const direction = new Vector2();
  direction.subVectors(currentPos, targetPos);

  console.log(direction);

  useFrame((state, delta) => {
    if (travelling) {
      bodyRef.current.position.x -= ((direction.x / 3) * delta) / distance;
      bodyRef.current.position.z -= ((direction.y / 3) * delta) / distance;
      console.log(bodyRef.current.position.z);
    }
  });

  return (
    <>
      <mesh
        ref={bodyRef}
        position-x={5}
        position-z={5}
        position-y={0.5}
        scale={1}
        rotation-x={0}
      >
        <coneGeometry args={[0.3, 1, 3, 1]} />
        <meshStandardMaterial color={"lightblue"} />
      </mesh>
    </>
  );
};

export default PlayerMarker;
