"use client";

import { getMarketDataByName } from "@/actions/market";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { MarketData } from "@/types";
import {
  ShipCargoBaySaleTemplate,
  ShipEngineSaleTemplate,
} from "@prisma/client";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type BuyCargoBayProps = {
  setEquipmentType: Dispatch<SetStateAction<string>>;
  setEquipmentData: Dispatch<
    SetStateAction<
      ShipEngineSaleTemplate | ShipCargoBaySaleTemplate | undefined
    >
  >;
};

const BuyCargoBay = ({
  setEquipmentData,
  setEquipmentType,
}: BuyCargoBayProps) => {
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
          <th>Max Capacity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {marketData?.shipCargoBaySaleTemplates.map(
          (template: ShipCargoBaySaleTemplate) => (
            <tr key={template.id}>
              <td>{template.name}</td>
              <td>{template.currentDamage}</td>

              <td>{template.maxCapacity}</td>

              <td>{template.price}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => {
                    setEquipmentData(template);
                    setEquipmentType("cargoBay");
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

export default BuyCargoBay;
