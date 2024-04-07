"use client";

import SystemCommands from "@/components/dev/SystemCommands";
import MarketCommands from "@/components/dev/MarketCommands";
import ResourceCommands from "@/components/dev/ResourceCommands";
import ShipCommands from "@/components/dev/ShipCommands";
import UserCommands from "@/components/dev/UserCommands";
import CronResourceCommands from "@/components/dev/CronResourceCommands";
import ShipEngineSaleTemplateCommands from "@/components/dev/ShipEngineSaleTemplateCommands";

const DevPage = () => {
  return (
    <div className="flex flex-col items-start p-8 gap-2 bg-white">
      <CronResourceCommands />
      <MarketCommands />
      <ResourceCommands />
      <ShipEngineSaleTemplateCommands />
      <ShipCommands />
      <SystemCommands />
      <UserCommands />
    </div>
  );
};

export default DevPage;
