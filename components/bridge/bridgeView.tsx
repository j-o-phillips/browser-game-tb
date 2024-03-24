"use client";

import {
  FirstPersonControls,
  Html,
  PerspectiveCamera,
  RenderTexture,
} from "@react-three/drei";

import SystemMap from "../map/system/system";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import MapScreen from "../map/mapScreen";
import { MapObjectData } from "@/types";
import MapComputer from "../map/mapComputer";

const BridgeView = () => {
  const [FPCenabled, setFPCenabled] = useState<boolean>(true);
  const [cameraPos, setCameraPos] = useState<number[]>([0, 0, 30]);
  useFrame((state) => {
    if (!FPCenabled) {
      state.camera.position.set(cameraPos[0], cameraPos[1], cameraPos[2]);
      state.camera.lookAt(-8, 0, 0);
    }
  });
  return (
    <>
      <FirstPersonControls
        lookSpeed={0.02}
        enabled={FPCenabled}
        lookVertical={false}
      />
      <ambientLight intensity={3} />
      <MapComputer setFPCenabled={setFPCenabled} setCameraPos={setCameraPos} />
    </>
  );
};

export default BridgeView;
