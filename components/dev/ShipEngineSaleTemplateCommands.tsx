"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { getShipById } from "@/actions/ship";
import {
  CreateShipEngineSaleTemplateData,
  connectShipTemplateToMarket,
  createShipEngineSaleTemplate,
} from "@/actions/shipEngineSaleTemplate";

const ShipEngineSaleTemplateCommands = () => {
  const [templateData, setTemplateData] =
    useState<CreateShipEngineSaleTemplateData>({
      name: "",
      currentDamage: 0,
      fuelConsumption: 0,
      speed: 0,
      price: 0,
      maxJump: 0,
    });
  const [marketId, setMarketId] = useState<string>("");
  const [templateId, setTemplateId] = useState<string>("");

  const handleCreateShipEngineSaleTemplate = (e: any) => {
    e.preventDefault();
    console.log(templateData);
    if (!templateData) return "Template data not found";
    try {
      createShipEngineSaleTemplate(templateData).then((data) => {
        console.log(data);
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleConnectTemplateToMarket = (e: any) => {
    e.preventDefault();

    try {
      connectShipTemplateToMarket(templateId, marketId).then((data) => {
        console.log(data);
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl underline">Ship Engine Sale Template</h1>
      <div className="flex items-start gap-2">
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={handleCreateShipEngineSaleTemplate}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => {
                setTemplateData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
            <input
              type="number"
              name="currentDamage"
              placeholder="Current Damage"
              onChange={(e) => {
                setTemplateData((prev) => ({
                  ...prev,
                  currentDamage: Number(e.target.value),
                }));
              }}
            />
            <input
              type="number"
              name="fuelConsumption"
              placeholder="Fuel Consumption"
              onChange={(e) => {
                setTemplateData((prev) => ({
                  ...prev,
                  fuelConsumption: Number(e.target.value),
                }));
              }}
            />
            <input
              type="number"
              name="speed"
              placeholder="Speed"
              onChange={(e) => {
                setTemplateData((prev) => ({
                  ...prev,
                  speed: Number(e.target.value),
                }));
              }}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={(e) => {
                setTemplateData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }));
              }}
            />
            <input
              type="number"
              name="maxJump"
              placeholder="Max Jump"
              onChange={(e) => {
                setTemplateData((prev) => ({
                  ...prev,
                  maxJump: Number(e.target.value),
                }));
              }}
            />
            <Button type="submit" size="sm">
              Create Ship Engine Sale Template
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={handleConnectTemplateToMarket}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="marketId"
              placeholder="Market Id"
              onChange={(e) => {
                setMarketId(e.target.value);
              }}
            />
            <input
              type="text"
              name="templateId"
              placeholder="Template Id"
              onChange={(e) => {
                setTemplateId(e.target.value);
              }}
            />

            <Button type="submit" size="sm">
              Connect Template to Market
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShipEngineSaleTemplateCommands;
