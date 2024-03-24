"use client";
import SystemMap from "./system/system";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { MapObjectData } from "@/types";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import PlayerMarker from "./system/playerMarker";
import CelestialBody from "./system/celestialBody";

type MapScreenProps = {
  objectData: MapObjectData | undefined;
  setObjectData: Dispatch<SetStateAction<MapObjectData | undefined>>;
};

const MapScreen = ({ objectData, setObjectData }: MapScreenProps) => {
  const sunMap = useLoader(TextureLoader, "/planetText/sun.jpg");
  const planet1Map = useLoader(TextureLoader, "/planetText/planet1.jpg");
  const planet2Map = useLoader(TextureLoader, "/planetText/planet2.jpg");

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <OrbitControls />
      <ambientLight intensity={0.7} />
      <pointLight intensity={7} decay={0.2} />
      <Stars
        radius={80}
        depth={50}
        count={5000}
        factor={2}
        saturation={0}
        fade
      />
      <PlayerMarker objectData={objectData} />
      <CelestialBody
        name="Sun"
        texture={sunMap}
        emissive={0xfcba03}
        emissiveIntensity={0.2}
        rotationSpeed={0}
        setObjectData={setObjectData}
        positionX={0}
        positionZ={0}
      />
      <CelestialBody
        name="Arubula"
        texture={planet1Map}
        positionX={5}
        positionZ={10}
        scale={1.3}
        rotationSpeed={0.3}
        setObjectData={setObjectData}
      />
      <CelestialBody
        name="Zendon"
        texture={planet2Map}
        positionX={-10}
        positionZ={-5}
        scale={0.8}
        rotationSpeed={0.5}
        setObjectData={setObjectData}
      />

      <gridHelper args={[50, 10, "gray", "gray"]} />
      <axesHelper args={[5]} />
    </>
  );
};

export default MapScreen;
