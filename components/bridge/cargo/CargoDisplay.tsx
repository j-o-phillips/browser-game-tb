"use client";

import { updateShipFuelByid } from "@/actions/ship";
import { transferFuelFromCargoToShip } from "@/actions/trade";
import { getUserById } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import Card from "@/customUi/Card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { number } from "zod";

const CargoDisplay = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserContext();
  const { globalData, setGlobalData } = useGlobalContext();
  const [fuelAmount, setFuelAmount] = useState<{
    fuelAmount: number;
    resourceId: string;
  }>({
    fuelAmount: 0,
    resourceId: "",
  });

  // useEffect(() => {
  //   getUserById(userData?.id!).then((data) => {
  //     if (data) setUserData(data);
  //   });
  // }, [userData]);

  const onTransferFuel = (e: any) => {
    e.preventDefault();
    transferFuelFromCargoToShip(
      fuelAmount,
      userData?.ship.id!,
      userData?.id!
    ).then((data) => {
      console.log(data);
      if (data?.ship) setUserData(data);
    });
  };

  const toggleCargoModal = () => {
    setGlobalData({
      ...globalData,
      cargoModalOpen: !globalData.cargoModalOpen,
    });
  };
  return (
    <Card>
      <h1>Cargo Display</h1>
      {userData?.ship.shipCargoBay.resources.map((resource) => {
        if (resource.name === "Fuel")
          return (
            <div className="flex gap-2 items-center" key={resource.name}>
              <h4>
                {resource.name}: {resource.amount}
              </h4>
              <input
                type="number"
                name="fuelAmount"
                placeholder="Amount"
                onChange={(e) => {
                  setFuelAmount({
                    fuelAmount: parseInt(e.target.value),
                    resourceId: resource.id,
                  });
                }}
              />
              <Button onClick={onTransferFuel}>Transfer fuel to ship</Button>
            </div>
          );
        return (
          <h4 key={resource.name}>
            {resource.name}: {resource.amount}
          </h4>
        );
      })}

      <Button onClick={toggleCargoModal}>To Bridge</Button>
    </Card>
  );
};

export default CargoDisplay;
