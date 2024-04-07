import { Html, OrbitControls, Stars, Text } from "@react-three/drei";
import CelestialBody from "./celestialBody";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { useLoader } from "@react-three/fiber";
import PlayerMarker from "./playerMarker";
import { Dispatch, SetStateAction, useRef } from "react";
import { MapObjectData } from "@/types";
import { arubula, polox, sun, zendon } from "@/data/markets";

type SystemMapProps = {
  objectData: MapObjectData | undefined;
  setObjectData: Dispatch<SetStateAction<MapObjectData | undefined>>;
};

const SystemMap = ({ setObjectData, objectData }: SystemMapProps) => {
  const sunMap = useLoader(TextureLoader, "/planetText/sun.jpg");
  const planet1Map = useLoader(TextureLoader, "/planetText/planet1.jpg");
  const planet2Map = useLoader(TextureLoader, "/planetText/planet2.jpg");
  const planet3Map = useLoader(TextureLoader, "/planetText/planet3.jpg");
  const body = useRef();
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
        factor={6}
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
        positionX={sun.positionX}
        positionZ={sun.positionZ}
        unclickable
      />
      <CelestialBody
        name="Arubula"
        texture={planet1Map}
        positionX={arubula.positionX}
        positionZ={arubula.positionZ}
        scale={1.3}
        rotationSpeed={0.3}
        setObjectData={setObjectData}
      />
      <CelestialBody
        name="Zendon"
        texture={planet2Map}
        positionX={zendon.positionX}
        positionZ={zendon.positionZ}
        scale={0.8}
        rotationSpeed={0.5}
        setObjectData={setObjectData}
      />
      <CelestialBody
        name="Polox"
        texture={planet3Map}
        positionX={polox.positionX}
        positionZ={polox.positionZ}
        scale={1.5}
        rotationSpeed={0.3}
        setObjectData={setObjectData}
      />

      <gridHelper args={[50, 10, "gray", "gray"]} />
      {/* <axesHelper args={[5]} /> */}
    </>
  );
};

export default SystemMap;
