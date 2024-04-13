"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import CelestialBody from "../../map/system/celestialBody";
import { useUserContext } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { useEffect, useState } from "react";
import { Stars } from "@react-three/drei";

const InOrbit = () => {
  // const { userData } = useUserContext();
  // const router = useRouter();
  // let textureString = `/planetText/Arubula.jpg`;

  // useEffect(() => {
  //   if (!userData) {
  //     router.push("/game");
  //   }
  // }, [userData, router]);

  // switch (userData?.currentLoc) {
  //   case "Arubula":
  //     textureString = `/planetText/Arubula.jpg`;
  //     break;

  //   default:
  //     break;
  // }

  // const texture = useLoader(TextureLoader, "/planetText/Arubula.jpg");
  const planet1Map = useLoader(TextureLoader, "/planetText/Arubula.jpg");

  return (
    <div className=" bg-black h-full ">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 25 }}>
        <ambientLight intensity={2} />

        <Stars
          radius={80}
          depth={50}
          count={5000}
          factor={6}
          saturation={0}
          fade
        />
        {/* <CelestialBody
          name="Arubula"
          texture={planet1Map}
          positionX={-1}
          positionZ={0}
          scale={1}
          rotationSpeed={0.02}
          setObjectData={() => {}}
          unclickable
        /> */}
      </Canvas>
    </div>
  );
};

export default InOrbit;
