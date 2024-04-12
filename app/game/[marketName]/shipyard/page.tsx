"use client";

import PlayerDetails from "@/components/market/marketPlace/playerDetails";
import ShipEquipment from "@/components/market/shipyard/ShipEquipment";
import BuyEquipment from "@/components/market/shipyard/buyEquipment";
import EquipmentDetails from "@/components/market/shipyard/equipmentDetails";
import {
  ShipCargoBaySaleTemplate,
  ShipEngineSaleTemplate,
} from "@prisma/client";
import { useState } from "react";

const MarketShipyard = () => {
  const [equipmentType, setEquipmentType] = useState("");
  const [equipmentData, setEquipmentData] = useState<
    ShipEngineSaleTemplate | ShipCargoBaySaleTemplate | undefined
  >();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:h-screen py-10 text-primary-foreground px-4 gap-4">
        <PlayerDetails />
        <EquipmentDetails
          equipmentData={equipmentData}
          equipmentType={equipmentType}
        />
        <ShipEquipment />
        <BuyEquipment
          setEquipmentData={setEquipmentData}
          setEquipmentType={setEquipmentType}
        />
      </div>
    </>
  );
};

export default MarketShipyard;
