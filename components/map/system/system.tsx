import { OrbitControls, Stars } from "@react-three/drei";
import CelestialBody from "./celestialBody";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "@react-three/fiber";
import PlayerMarker from "./playerMarker";
import { Dispatch, SetStateAction } from "react";
import { MapObjectData } from "@/types";
import { object } from "zod";

// import Planet1 from "./planets/Planet1";
// import Planet2 from "./planets/Planet2";
// import Planet3 from "./planets/Planet3";
// import Planet4 from "./planets/Planet4";
// import Planet5 from "./planets/Planet5";
// import Planet6 from "./planets/Planet6";
// import Planet7 from "./planets/Planet7";

type SystemMapProps = {
  objectData: MapObjectData | undefined;
  setObjectData: Dispatch<SetStateAction<MapObjectData | undefined>>;
};

const SystemMap = ({ setObjectData, objectData }: SystemMapProps) => {
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

export default SystemMap;
