"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import Card from "@/customUi/Card";

const BridgeNav = () => {
  const router = useRouter();
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData, setUserData } = useUserContext();
  return (
    <>
      <Card>
        <h3 className="text-purple-500">
          Current Location: {userData?.currentLoc}
        </h3>
        <h3>Course Destination: {globalData?.targetName} </h3>
        <h3>
          Distance to Destination:{" "}
          <span
            className={
              globalData?.distanceToTarget! > userData?.ship.shipEngine.maxJump!
                ? "text-red-500"
                : ""
            }
          >
            {globalData?.distanceToTarget?.toFixed(2)} units{" "}
          </span>
        </h3>
        <h3>
          Fuel required:{" "}
          <span
            className={
              globalData?.fuelRequiredToDest! > userData?.ship.fuel!
                ? "text-red-500"
                : ""
            }
          >
            {globalData?.fuelRequiredToDest?.toFixed(2)} units{" "}
          </span>
        </h3>
      </Card>
    </>
  );
};

export default BridgeNav;
