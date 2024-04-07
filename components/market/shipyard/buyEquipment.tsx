"use client";

import Card from "@/customUi/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyEngine from "./buyEngine";
import BuyCargoBay from "./buyCargoBay";
import { Dispatch, SetStateAction } from "react";
import { ShipEngineSaleTemplate } from "@prisma/client";

type BuyEquipmentProps = {
  setEquipmentType: Dispatch<SetStateAction<string>>;
  setEquipmentData: Dispatch<
    SetStateAction<ShipEngineSaleTemplate | undefined>
  >;
};
const BuyEquipment = ({
  setEquipmentData,
  setEquipmentType,
}: BuyEquipmentProps) => {
  return (
    <Card>
      <h1>Ship Equipment for Sale</h1>
      <Tabs
        defaultValue="engine"
        className="h-1/2 w-full flex flex-col items-center"
      >
        <TabsList>
          <TabsTrigger value="weapons">Weapons</TabsTrigger>
          <TabsTrigger value="engine">Engines</TabsTrigger>
          <TabsTrigger value="shields">Shields</TabsTrigger>
          <TabsTrigger value="cargoBay">Cargo Bay</TabsTrigger>
        </TabsList>
        <TabsContent value="weapons">Coming soon</TabsContent>
        <TabsContent value="engine">
          <BuyEngine
            setEquipmentData={setEquipmentData}
            setEquipmentType={setEquipmentType}
          />
        </TabsContent>
        <TabsContent value="shields">Coming Soon</TabsContent>
        <TabsContent value="cargoBay">
          <BuyCargoBay />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default BuyEquipment;
