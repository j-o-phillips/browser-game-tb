"use client";

import { updateShipEngineById } from "@/actions/shipEngine";
import { buyShipEngine } from "@/actions/trade";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import Card from "@/customUi/Card";
import { ShipEngine, ShipEngineSaleTemplate } from "@prisma/client";

type EquipmentDetailsProps = {
  equipmentType: string;
  equipmentData: ShipEngineSaleTemplate | undefined;
};

const EquipmentDetails = ({
  equipmentData,
  equipmentType,
}: EquipmentDetailsProps) => {
  const { userData, setUserData } = useUserContext();

  const handleBuyEquipment = () => {
    if (!userData) return console.log("User data not found");
    if (!equipmentData) return console.log("Equipment data not found");
    if (userData.credits < equipmentData.price)
      return console.log("Insufficient credits");

    switch (equipmentType) {
      case "engine":
        buyShipEngine(
          userData.id,
          userData.credits,
          userData.ship.shipEngine.id,
          equipmentData
        ).then((data) => {
          setUserData(data);
        });
        break;
      case "cargoBay":
        console.log("cargoBay");
        break;
      case "shields":
        console.log("shields");
        break;
      case "weapons":
        console.log("weapons");
        break;
    }
  };
  return (
    <Card>
      <h1>Equipment Details</h1>
      <h4>{equipmentData?.name}</h4>

      <Button onClick={handleBuyEquipment}>Buy and Install</Button>
    </Card>
  );
};

export default EquipmentDetails;
