"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";

const BridgeNav = () => {
  const router = useRouter();
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData, setUserData } = useUserContext();
  return (
    <>
      <div className="flex flex-col items-center gap-2 py-2">
        <h3 className="text-orange-500">
          Current Location: {userData?.currentLoc}
        </h3>
        <h3>Course Destination: {globalData?.targetName} </h3>
        <h3>
          Distance to Destination: {globalData?.distanceToTarget?.toFixed(2)}{" "}
          units{" "}
        </h3>
        <h3>Fuel required:</h3>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/game/bridge/map")}>
            To map
          </Button>
          <Button onClick={() => router.push(`/game/${userData?.currentLoc}`)}>
            To Spaceport
          </Button>
        </div>
      </div>
    </>
  );
};

export default BridgeNav;
