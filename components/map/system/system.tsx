"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import CelestialBody from "./celestialBody";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "@react-three/fiber";

// import Planet1 from "./planets/Planet1";
// import Planet2 from "./planets/Planet2";
// import Planet3 from "./planets/Planet3";
// import Planet4 from "./planets/Planet4";
// import Planet5 from "./planets/Planet5";
// import Planet6 from "./planets/Planet6";
// import Planet7 from "./planets/Planet7";

const SystemMap = () => {
  const sunMap = useLoader(TextureLoader, "/planetText/sun.jpg");
  const planet1Map = useLoader(TextureLoader, "/planetText/planet1.jpg");
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
      <CelestialBody
        texture={sunMap}
        emissive={0xfcba03}
        emissiveIntensity={0.2}
      />
      <CelestialBody texture={planet1Map} positionX={4} />
    </>
  );
};

export default SystemMap;
