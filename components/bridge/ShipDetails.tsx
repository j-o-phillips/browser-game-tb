"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Card from "@/customUi/Card";

const ShipDetails = () => {
  const router = useRouter();
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData, setUserData } = useUserContext();

  console.log(userData);
  return (
    <Card>
      <h2>Ship Details</h2>
      <h4>Name: {userData?.ship.name}</h4>
      <h4>
        Hull Strength: {userData?.ship.currentHull} / {userData?.ship.maxHull}
      </h4>
      <h4>Fuel: {userData?.ship.fuel}</h4>
      <h4>Engine: {userData?.ship.shipEngine.name}</h4>
      <h4>Cargo Bay: {userData?.ship.shipCargoBay.name}</h4>

      <div className="flex gap-2">
        <Button onClick={() => router.push("/game/bridge/map")}>Map</Button>
        <Button onClick={() => router.push("/game/bridge/cargo")}>
          Cargo Bay
        </Button>
        <Button onClick={() => router.push("/game/bridge/loadout")}>
          Loadout
        </Button>
        <Button onClick={() => router.push("/game/bridge/data")}>
          Data Center
        </Button>
      </div>
    </Card>
  );
};

export default ShipDetails;
