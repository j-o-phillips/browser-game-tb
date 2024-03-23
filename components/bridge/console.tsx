"use client";

import Map from "@/app/game/bridge/map/page";
import {
  OrbitControls,
  PerspectiveCamera,
  RenderTexture,
  Text,
} from "@react-three/drei";
import { BoxGeometry, Mesh, Vector3 } from "three";
import SystemMap from "../map/system/system";
import MapOverlay from "../map/galaxy/overlay";
import { Console } from "console";
import { Dispatch, SetStateAction, useState } from "react";
import { useFrame } from "@react-three/fiber";

type BridgeConsoleProps = {
  setFPCenabled: Dispatch<SetStateAction<boolean>>;
  FPCenabled: boolean;
};

const BridgeConsole = ({ setFPCenabled, FPCenabled }: BridgeConsoleProps) => {
  const [cameraPos, setCameraPos] = useState<number[]>([0, 0, 15]);
  useFrame((state) => {
    if (!FPCenabled) {
      state.camera.position.set(cameraPos[0], cameraPos[1], cameraPos[2]);
      state.camera.lookAt(-3, 0, 0);
    }
  });
  return (
    <>
      <mesh
        position={[-3, 0, 0]}
        onContextMenu={() => {
          const cam = [-3, 0, 3];
          setFPCenabled(false);
          setCameraPos(cam);
        }}
      >
        <planeGeometry args={[2, 1]} />
        <meshStandardMaterial>
          <RenderTexture attach="map" anisotropy={16}>
            <PerspectiveCamera
              makeDefault
              manual
              aspect={2 / 1}
              position={[0, 0, 5]}
            />
            <color attach="background" args={["black"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <SystemMap />
          </RenderTexture>
        </meshStandardMaterial>
      </mesh>
      <mesh position={[0, 0, 0]} onClick={() => setFPCenabled(true)}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial>
          <RenderTexture attach="map" anisotropy={16}>
            <PerspectiveCamera
              makeDefault
              manual
              aspect={1 / 1}
              position={[0, 0, 5]}
            />
            <color attach="background" args={["orange"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="red" />
            </mesh>
          </RenderTexture>
        </meshStandardMaterial>
      </mesh>
      <mesh position={[3, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial>
          <RenderTexture attach="map" anisotropy={16}>
            <PerspectiveCamera
              makeDefault
              manual
              aspect={1 / 1}
              position={[0, 0, 5]}
            />
            <color attach="background" args={["orange"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="red" />
            </mesh>
          </RenderTexture>
        </meshStandardMaterial>
      </mesh>
    </>
  );
};

export default BridgeConsole;
