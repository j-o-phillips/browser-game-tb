"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  deleteResourceById,
  getResourceById,
  getResourcesByShipCargoBayOrMarketId,
  updateResourceAmountById,
} from "@/actions/resource";

const ResourceCommands = () => {
  const [resourceId, setResourceId] = useState<string>("");
  const [containerId, setContainerId] = useState<string>("");
  const [newAmount, setNewAmount] = useState<number>(0);
  const onGetResourceById = (e: any) => {
    e.preventDefault();
    getResourceById(resourceId).then((data) => {
      console.log(data);
    });
  };

  const onGetResourcesByMarketId = (e: any) => {
    e.preventDefault();
    console.log(containerId);
    if (!containerId) return "Market id or ship cargo bay id required";
    getResourcesByShipCargoBayOrMarketId({ marketId: containerId }).then(
      (data) => {
        console.log(data);
      }
    );
  };

  const onGetResourcesByShipCargoBayId = (e: any) => {
    e.preventDefault();
    console.log(containerId);
    if (!containerId) return "Market id or ship cargo bay id required";
    getResourcesByShipCargoBayOrMarketId({ shipCargoBayId: containerId }).then(
      (data) => {
        console.log(data);
      }
    );
  };

  const onUpdateResourceAmountById = (e: any) => {
    e.preventDefault();
    updateResourceAmountById(resourceId, newAmount).then((data) => {
      console.log(data);
    });
  };

  const onDeleteResourceById = (e: any) => {
    e.preventDefault();
    console.log(resourceId);
    if (!resourceId) return "Resource id required";
    deleteResourceById(resourceId).then((data) => {
      console.log(data);
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl underline">Resource</h1>
      <div className="flex items-start gap-2 flex-wrap">
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onGetResourceById}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="resourceId"
              placeholder="Resource Id"
              onChange={(e) => {
                setResourceId(e.target.value);
              }}
            />
            <Button type="submit" size="sm">
              Get Resource by Id
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onGetResourcesByMarketId}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="name"
              placeholder="System name"
              onChange={(e) => setContainerId(e.target.value)}
            />
            <Button type="submit" size="sm">
              Get Resources by Market Id
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onGetResourcesByShipCargoBayId}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="name"
              placeholder="System name"
              onChange={(e) => setContainerId(e.target.value)}
            />
            <Button type="submit" size="sm">
              Get Resources by Ship Cargo Bay Id
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onUpdateResourceAmountById}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="resourceId"
              placeholder="ResourcId"
              onChange={(e) => setResourceId(e.target.value)}
            />
            <input
              type="number"
              name="newAmount"
              placeholder="new Amount"
              onChange={(e) => setNewAmount(Number(e.target.value))}
            />

            <Button type="submit" size="sm">
              Update Resource Amount by Id
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onDeleteResourceById}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="resourceId"
              placeholder="Resource Id"
              onChange={(e) => setResourceId(e.target.value)}
            />
            <Button type="submit" size="sm">
              Delete Resource by Id
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResourceCommands;
