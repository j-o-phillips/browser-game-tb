"use client";

import SystemCommands from "@/components/dev/SystemCommands";
import MarketCommands from "@/components/dev/MarketCommands";
import ResourceCommands from "@/components/dev/ResourceCommands";
import ShipCommands from "@/components/dev/ShipCommands";
import UserCommands from "@/components/dev/UserCommands";
import CronResourceCommands from "@/components/dev/CronResourceCommands";
import ShipEngineSaleTemplateCommands from "@/components/dev/ShipEngineSaleTemplateCommands";
import ShipCargoBaySaleTemplateCommands from "@/components/dev/ShipCargoBaySaleTemplateCommands";
import FactoryCommands from "@/components/dev/FactoryCommands";

const DevPage = () => {
  return (
    <div className="flex flex-col items-start p-8 gap-2 bg-white">
      <CronResourceCommands />
      <FactoryCommands />
      <MarketCommands />
      <ResourceCommands />
      <ShipCargoBaySaleTemplateCommands />
      <ShipEngineSaleTemplateCommands />
      <ShipCommands />
      <SystemCommands />
      <UserCommands />
    </div>
  );
};

export default DevPage;
