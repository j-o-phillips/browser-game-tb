"use client";

import { getMarketDataByName } from "@/actions/market";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { MarketData } from "@/types";
import { ShipEngineSaleTemplate } from "@prisma/client";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type BuyEngineProps = {
  setEquipmentType: Dispatch<SetStateAction<string>>;
  setEquipmentData: Dispatch<
    SetStateAction<ShipEngineSaleTemplate | undefined>
  >;
};

const BuyEngine = ({ setEquipmentData, setEquipmentType }: BuyEngineProps) => {
  const { marketName } = useParams() as { marketName: string };
  const { userData, setUserData } = useUserContext();
  const [marketData, setMarketData] = useState<MarketData | null>();

  useEffect(() => {
    getMarketDataByName(marketName).then((data) => {
      setMarketData(data);
      console.log(data);
    });
  }, [userData]);

  return (
    <table className=" table-auto text-center">
      <thead>
        <tr>
          <th className="">Name</th>
          <th>Damage</th>
          <th>Speed</th>
          <th>Fuel Consumption</th>
          <th>Max Jump</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {marketData?.shipEngineSaleTemplates.map(
          (template: ShipEngineSaleTemplate) => (
            <tr key={template.id}>
              <td>{template.name}</td>
              <td>{template.currentDamage}</td>
              <td>{template.speed}</td>
              <td>{template.fuelConsumption}</td>
              <td>{template.maxJump}</td>
              <td>{template.price}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => {
                    setEquipmentData(template);
                    setEquipmentType("engine");
                  }}
                >
                  View
                </Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default BuyEngine;
