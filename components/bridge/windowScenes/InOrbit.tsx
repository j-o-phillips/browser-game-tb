"use client";

import { Canvas, useLoader } from "@react-three/fiber";

import { Stars } from "@react-three/drei";
import { TextureLoader } from "three";
import CelestialBody from "@/components/map/system/celestialBody";
import { useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const InOrbit = () => {
  const { userData } = useUserContext();
  const router = useRouter();
  // let textureString = `/planetText/Arubula.jpg`;

  useEffect(() => {
    if (!userData) {
      router.push("/game");
    }
  }, [userData, router]);

  const texture = useLoader(
    TextureLoader,
    `/planetText/${userData?.currentLoc}.jpg`
  );

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
        <CelestialBody
          name="Arubula"
          texture={texture}
          positionX={-1}
          positionZ={0}
          scale={1}
          rotationSpeed={0.02}
          setObjectData={() => {}}
          unclickable
        />
      </Canvas>
    </div>
  );
};

export default InOrbit;
