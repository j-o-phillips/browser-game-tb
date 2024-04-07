"use client";

import Card from "@/customUi/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EngineDisplay from "./engineDisplay";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import CargoBayDisplay from "./cargoBayDisplay";

const ShipEquipment = () => {
  const { userData } = useUserContext();

  return (
    <Card>
      <h1>Ship Equipment</h1>
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
          <EngineDisplay />
        </TabsContent>
        <TabsContent value="shields">Coming Soon</TabsContent>
        <TabsContent value="cargoBay">
          <CargoBayDisplay />
        </TabsContent>
      </Tabs>
      <Button onClick={() => console.log(userData)}>Print user data</Button>
    </Card>
  );
};

export default ShipEquipment;
