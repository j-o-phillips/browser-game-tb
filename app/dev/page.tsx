"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { addSystem } from "@/devActions/systems";
import { addMarket } from "@/devActions/planets";

const DevPage = () => {
  const [marketData, setMarketData] = useState({});
  const [systemData, setSystemData] = useState({});

  const onCreateMarket = () => {
    console.log(marketData);
    addMarket(marketData).then((data) => {
      console.log(data.success);
    });
  };

  const onCreateSystem = () => {
    console.log(systemData);
    addSystem(systemData).then((data) => {
      console.log(data.success);
    });
  };

  return (
    <div className="flex p-8 gap-2">
      <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
        <form
          onSubmit={onCreateMarket}
          className="flex flex-col gap-4 text-center"
        >
          <input
            type="text"
            name="name"
            placeholder="Market name"
            onChange={(e) => {
              setMarketData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <input
            type="number"
            name="position"
            placeholder="position"
            onChange={(e) => {
              setMarketData((prev) => ({
                ...prev,
                position: e.target.value,
              }));
            }}
          />
          <input
            type="number"
            name="resources"
            placeholder="Resources"
            onChange={(e) => {
              setMarketData((prev) => ({
                ...prev,
                resources: e.target.value,
              }));
            }}
          />
          <input
            type="text"
            name="systemId"
            placeholder="System Id"
            onChange={(e) => {
              setMarketData((prev) => ({
                ...prev,
                systemId: e.target.value,
              }));
            }}
          />
          <Button type="submit" size="sm">
            Add Planet
          </Button>
        </form>
      </div>
      <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
        <form
          onSubmit={onCreateSystem}
          className="flex flex-col gap-4 text-center"
        >
          <input
            type="text"
            name="name"
            placeholder="System name"
            onChange={(e) => {
              setSystemData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <Button type="submit" size="sm">
            Add System
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DevPage;
