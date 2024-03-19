"use client";

import SystemMap from "@/components/map/system/system";
import { Canvas } from "@react-three/fiber";

const Map = () => {
  return (
    <div>
      <Canvas
        className=" w-full bg-black"
        style={{
          height: "100vh",
        }}
        camera={{ position: [40, 15, 0], fov: 25 }}
      >
        <SystemMap />
      </Canvas>
    </div>
  );
};

export default Map;
