"use client";

import BridgeCommands from "@/components/bridge/BridgeCommands";
import BridgeNav from "@/components/bridge/BridgeNav";
import ShipDetails from "@/components/bridge/ShipDetails";
import InOrbit from "@/components/bridge/windowScenes/InOrbit";
import { useUserContext } from "@/context/UserContext";

const Bridge = () => {
  const { userData } = useUserContext();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] lg:grid-rows-3  lg:h-screen p-4 gap-4 text-primary-foreground">
      <div className="row-span-3">
        <BridgeCommands />
      </div>
      <div className=" ">
        <BridgeNav />
      </div>
      <div className="row-span-1 h-full  w-full bg-[#00f2ff52] border-2 border-cyan-500">
        <h2>Target Image</h2>
      </div>
      <div className="">
        <InOrbit />
      </div>
      <div className="row-span-2 h-full  w-full bg-[#00f2ff52] border-2 border-cyan-500">
        <h1>Scanner Targets</h1>
      </div>
      <div>
        <ShipDetails />
      </div>
    </div>
  );
};

export default Bridge;
