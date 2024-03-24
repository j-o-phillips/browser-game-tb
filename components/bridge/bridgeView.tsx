"use client";

import {
  FirstPersonControls,
  Html,
  PerspectiveCamera,
  RenderTexture,
} from "@react-three/drei";

import SystemMap from "../map/system/system";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import MapScreen from "../map/mapScreen";
import { MapObjectData } from "@/types";
import MapComputer from "../map/mapComputer";
import MainConsoleComputer from "./mainConsole/mainConsoleComputer";

const BridgeView = () => {
  const [mapCameraEnabled, setMapCameraEnabled] = useState<boolean>(false);
  const [consoleCameraEnabled, setConsoleCameraEnabled] =
    useState<boolean>(false);
  const [mapCameraPos, setMapCameraPos] = useState<number[]>([0, 0, 30]);
  //! Camera Updates
  useFrame((state) => {
    if (mapCameraEnabled) {
      state.camera.position.set(
        mapCameraPos[0],
        mapCameraPos[1],
        mapCameraPos[2]
      );
      state.camera.lookAt(-8, 0, 0);
    }

    if (consoleCameraEnabled) {
      state.camera.position.set(
        mapCameraPos[0],
        mapCameraPos[1],
        mapCameraPos[2]
      );
      state.camera.lookAt(4, 0, 0);
    }
  });

  //! Game state timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("state check");
    }, 1000);
  }, []);
  return (
    <>
      <FirstPersonControls
        lookSpeed={0.02}
        movementSpeed={4}
        enabled={!consoleCameraEnabled && !mapCameraEnabled}
        lookVertical={false}
      />
      <ambientLight intensity={3} />
      <MapComputer
        setMapCameraEnabled={setMapCameraEnabled}
        setMapCameraPos={setMapCameraPos}
      />
      <MainConsoleComputer
        setConsoleCameraEnabled={setConsoleCameraEnabled}
        setMapCameraPos={setMapCameraPos}
      />
    </>
  );
};

export default BridgeView;
