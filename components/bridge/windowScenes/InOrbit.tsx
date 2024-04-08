"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import CelestialBody from "../../map/system/celestialBody";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { TextureLoader, Vector3 } from "three";
import { useEffect } from "react";
import { OrbitControls, Stars } from "@react-three/drei";

const InOrbit = () => {
  const { userData } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push("/game");
    }
  }, [userData, router]); // Ensure useEffect runs when userData or router changes

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
          name={userData!.currentLoc}
          texture={texture}
          positionX={-1}
          positionZ={0}
          scale={1}
          rotationSpeed={0.02}
          setObjectData={() => {}}
        />
      </Canvas>
    </div>
  );
};

export default InOrbit;
