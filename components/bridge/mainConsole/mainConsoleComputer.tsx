"use client";

import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import { Html, PerspectiveCamera, RenderTexture } from "@react-three/drei";
import { Dispatch, SetStateAction } from "react";

type MainConsoleComputerProps = {
  setConsoleCameraEnabled: Dispatch<SetStateAction<boolean>>;
  setMapCameraPos: Dispatch<SetStateAction<number[]>>;
};

const MainConsoleComputer = ({
  setConsoleCameraEnabled,
  setMapCameraPos,
}: MainConsoleComputerProps) => {
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData } = useUserContext();

  return (
    <mesh
      position={[4, 0, 0]}
      onContextMenu={() => {
        const cam = [4, 0, 20];
        setConsoleCameraEnabled(true);
        setMapCameraPos(cam);
      }}
    >
      <planeGeometry args={[8, 6]} />
      <meshStandardMaterial>
        {/* <RenderTexture attach="map" anisotropy={2}>
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 5]}
          />
          <color attach="background" args={["orange"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
        </RenderTexture> */}
      </meshStandardMaterial>
      {/* As of now html has to be moved when the screen is moved */}
      <Html transform position={[0, 0, 0]}>
        <div
          className="text-white px-6 
      rounded-lg bg-slate-800 bg-opacity-50 text-center flex flex-col items-center gap-1 py-3 text-[5px]"
        >
          <Button
            className="text-[5px] h-[5px] px-2"
            onClick={() => console.log(userData)}
          >
            Log user context
          </Button>
          <Button
            className="text-[5px] h-[5px] px-2"
            onClick={() => console.log(globalData)}
          >
            Log Global context
          </Button>
          <h3 className=" text-[6px]">
            Current course: {globalData.targetName}{" "}
          </h3>
          <h3 className=" text-[6px]">Time to Target: </h3>
          <Button
            className="text-[5px] h-[5px] px-2"
            onClick={() => {
              console.log("begin engine");
            }}
          >
            Launch
          </Button>
          <Button
            className="text-[5px] h-[5px] px-2"
            onClick={() => {
              setConsoleCameraEnabled(false);
            }}
          >
            Back to Bridge
          </Button>
        </div>
      </Html>
    </mesh>
  );
};

export default MainConsoleComputer;
