import { Html, PerspectiveCamera, RenderTexture } from "@react-three/drei";
import MapScreen from "./mapScreen";
import { Dispatch, SetStateAction, useState } from "react";
import { MapObjectData } from "@/types";

type MapComputerProps = {
  setFPCenabled: Dispatch<SetStateAction<boolean>>;
  setCameraPos: Dispatch<SetStateAction<number[]>>;
};

const MapComputer = ({ setFPCenabled, setCameraPos }: MapComputerProps) => {
  const [objectData, setObjectData] = useState<MapObjectData | undefined>();
  return (
    <mesh
      position={[-8, 0, 0]}
      onContextMenu={() => {
        const cam = [-8, 0, 20];
        setFPCenabled(false);
        setCameraPos(cam);
      }}
    >
      <planeGeometry args={[12, 6]} />
      <meshStandardMaterial>
        <RenderTexture attach="map" anisotropy={2}>
          <PerspectiveCamera
            makeDefault
            manual
            aspect={2 / 1}
            position={[0, 20, 25]}
          />
          <color attach="background" args={["black"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <MapScreen />
        </RenderTexture>
      </meshStandardMaterial>
      {/* As of now html has to be moved when the screen is moved */}
      <Html transform position={[4, -1, 0]}>
        <div
          className="text-white  w-[100px] h-[120px]  
      rounded-lg bg-slate-800 bg-opacity-50 text-center flex flex-col items-center gap-2 py-3"
        >
          <h3 className="text-orange-500 text-[5px]">Current course: </h3>
        </div>
      </Html>
    </mesh>
  );
};

export default MapComputer;
