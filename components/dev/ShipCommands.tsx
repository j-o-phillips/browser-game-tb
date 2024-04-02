"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { getShipById } from "@/actions/ship";

const ShipCommands = () => {
  const [shipId, setShipId] = useState<string>("");

  const handleGetShipById = (e: any) => {
    e.preventDefault();
    getShipById(shipId).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl underline">Ship</h1>
      <div className="flex items-start gap-2">
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={handleGetShipById}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="shipId"
              placeholder="Ship Id"
              onChange={(e) => {
                setShipId(e.target.value);
              }}
            />
            <Button type="submit" size="sm">
              Get Ship by Id
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShipCommands;
