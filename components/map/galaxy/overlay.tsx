"use client";

import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import { GlobalContextData, MapObjectData } from "@/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Vector2 } from "three";

type MapOverlayProps = {
  objectData: MapObjectData | undefined;
};

const MapOverlay = ({ objectData }: MapOverlayProps) => {
  const router = useRouter();
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
    <>
      <div
        className="text-white absolute bottom-0 right-0 w-[400px] h-[400px] z-[100]  m-4 
      rounded-lg bg-slate-800 bg-opacity-50 text-center flex flex-col items-center gap-2 py-3"
      >
        <h3 className="text-orange-500">
          Current course: {globalData.targetName}{" "}
        </h3>
        {objectData && (
          <>
            <h4>Object: {objectData.name}</h4>
            <h4>
              Position: {objectData.position[0]}, {objectData.position[1]}
            </h4>
            <h4>Distance: {distance.toFixed(2)}</h4>
            <Button onClick={onSetCourse}>Set Course</Button>
          </>
        )}
        <Button onClick={() => router.push("/game/bridge")}>
          Back to Bridge
        </Button>
      </div>
    </>
  );
};

export default MapOverlay;
