"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Card from "@/customUi/Card";
import { useState } from "react";
import MapModal from "../map/MapModal";
import CargoModal from "./cargo/CargoModal";

const ShipDetails = () => {
  const router = useRouter();
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData, setUserData } = useUserContext();

  const toggleMapModal = () => {
    setGlobalData({ ...globalData, mapModalOpen: !globalData.mapModalOpen });
  };

  const toggleCargoModal = () => {
    setGlobalData({
      ...globalData,
      cargoModalOpen: !globalData.cargoModalOpen,
    });
  };

  console.log(userData);
  return (
    <>
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
          <Button onClick={toggleMapModal}>Map</Button>
          <Button onClick={toggleCargoModal}>Cargo Bay</Button>
          <Button disabled onClick={() => router.push("/game/bridge/loadout")}>
            Loadout
          </Button>
          <Button disabled onClick={() => router.push("/game/bridge/data")}>
            Data Center
          </Button>
        </div>
      </Card>
      {globalData.mapModalOpen && <MapModal />}
      {globalData.cargoModalOpen && <CargoModal />}
    </>
  );
};

export default ShipDetails;
