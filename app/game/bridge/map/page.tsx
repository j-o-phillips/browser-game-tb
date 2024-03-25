"use client";

import MapOverlay from "@/components/map/galaxy/overlay";
import SystemMap from "@/components/map/system/system";
import { MapObjectData } from "@/types";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { Vector2 } from "three";

const Map = () => {
  const [objectData, setObjectData] = useState<MapObjectData | undefined>();

  return (
    <div
      className="overlow-hidden   w-full bg-black"
      style={{
        height: "100vh",
      }}
    >
      <MapOverlay objectData={objectData} />
      <Canvas camera={{ position: [0, 40, 50], fov: 25 }}>
        <SystemMap setObjectData={setObjectData} objectData={objectData} />
      </Canvas>
    </div>
  );
};

export default Map;
