"use client";

import MapOverlay from "@/components/map/galaxy/overlay";
import SystemMap from "@/components/map/system/system";
import { Canvas } from "@react-three/fiber";

const Map = () => {
  return (
    <div
      className="overlow-hidden   w-full bg-black"
      style={{
        height: "100vh",
      }}
    >
      <MapOverlay />
      <Canvas camera={{ position: [0, 40, 50], fov: 25 }}>
        <SystemMap />
      </Canvas>
    </div>
  );
};

export default Map;
