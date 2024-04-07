import { MapObjectData } from "@/types";
import { useState } from "react";
import MapOverlay from "./galaxy/overlay";
import { Canvas } from "@react-three/fiber";
import SystemMap from "./system/system";

const MapModal = () => {
  const [objectData, setObjectData] = useState<MapObjectData | undefined>();

  return (
    <div
      className="overlow-hidden absolute top-0 left-0  w-full bg-black"
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

export default MapModal;
