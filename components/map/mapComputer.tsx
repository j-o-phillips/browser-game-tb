import { Html, PerspectiveCamera, RenderTexture } from "@react-three/drei";
import MapScreen from "./mapScreen";
import { Dispatch, SetStateAction, useState } from "react";
import { GlobalContextData, MapObjectData } from "@/types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import { Vector2 } from "three";

type MapComputerProps = {
  setMapCameraEnabled: Dispatch<SetStateAction<boolean>>;
  setMapCameraPos: Dispatch<SetStateAction<number[]>>;
};

const MapComputer = ({
  setMapCameraEnabled,
  setMapCameraPos,
}: MapComputerProps) => {
  const [objectData, setObjectData] = useState<MapObjectData | undefined>();
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData } = useUserContext();

  const currentPos = new Vector2(
    userData?.currentPos[0],
    userData?.currentPos[1]
  );
  const targetPos = new Vector2(
    objectData?.position[0],
    objectData?.position[1]
  );

  const distance = currentPos.distanceTo(targetPos);

  const onSetCourse = () => {
    const data: GlobalContextData = {
      ...globalData,
      distanceToTarget: distance,
      targetPos: [objectData?.position[0] ?? 0, objectData?.position[1] ?? 0],
      targetName: objectData?.name ?? "",
    };
    setGlobalData(data);
  };
  return (
    <mesh
      position={[-8, 0, 0]}
      onContextMenu={() => {
        const cam = [-8, 0, 20];
        setMapCameraEnabled(true);
        setMapCameraPos(cam);
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
          <MapScreen objectData={objectData} setObjectData={setObjectData} />
        </RenderTexture>
      </meshStandardMaterial>
      {/* As of now html has to be moved when the screen is moved */}
      <Html transform position={[4, -1, 0]}>
        <div
          className="text-white  w-[100px] h-[120px]  
      rounded-lg bg-slate-800 bg-opacity-50 text-center flex flex-col items-center gap-1 py-3 text-[5px]"
        >
          <h3 className="text-orange-500 text-[6px]">
            Current course: {globalData.targetName}{" "}
          </h3>
          {objectData && (
            <>
              <h4>Object: {objectData.name}</h4>
              <h4>
                Position: {objectData.position[0]}, {objectData.position[1]}
              </h4>
              <h4>Distance: {distance.toFixed(2)}</h4>
              <Button className="text-[5px] h-[5px] px-2" onClick={onSetCourse}>
                Set Course
              </Button>
            </>
          )}
          <Button
            className="text-[5px] h-[5px] px-2"
            onClick={() => {
              setMapCameraEnabled(false);
            }}
          >
            Back to Bridge
          </Button>
        </div>
      </Html>
    </mesh>
  );
};

export default MapComputer;
