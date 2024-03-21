"use client";

import { Button } from "@/components/ui/button";
import { MapObjectData } from "@/types";
import { Dispatch, SetStateAction } from "react";

type MapOverlayProps = {
  objectData: MapObjectData | undefined;
  setTravelling: Dispatch<SetStateAction<boolean>>;
};

const MapOverlay = ({ objectData, setTravelling }: MapOverlayProps) => {
  return (
    <>
      <div className="text-white absolute bottom-0 right-0 w-[400px] h-[400px] z-[100] block m-4 rounded-lg bg-slate-800 opacity-50">
        {objectData && (
          <>
            <h4 className="my-3">Object: {objectData.name}</h4>
            <h4 className="my-3">
              Position: {objectData.position[0]}, {objectData.position[1]}
            </h4>
            <Button onClick={() => setTravelling(true)}>Set Course</Button>
          </>
        )}
      </div>
    </>
  );
};

export default MapOverlay;
