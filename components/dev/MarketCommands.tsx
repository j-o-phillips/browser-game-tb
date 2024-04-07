import { useState } from "react";
import { Button } from "../ui/button";
import {
  CreateMarketData,
  createNewMarket,
  deleteMarketById,
  getAllMarkets,
  getMarketsBySystemId,
  updateMarketCronResourceByAmount,
  updateMarketResourceByAmount,
} from "@/actions/market";
import { CreateResourceData } from "@/actions/resource";

const MarketCommands = () => {
  const [marketData, setMarketData] = useState<CreateMarketData>({
    name: "",
    systemId: "",
    positionX: "",
    positionY: "",
    landable: false,
    mineable: false,
  });
  const [systemId, setSystemId] = useState<string>("");
  const [marketId, setMarketId] = useState<string>("");
  const [resourceData, setResourceData] = useState<CreateResourceData>({
    name: "",
    amount: 0,
    baseValue: 0,
    marketId: "",
  });

  const onGetAllMarkets = () => {
    getAllMarkets().then((data) => {
      console.log(data);
    });
  };

  const onGetMarketsBySystemId = (e: any) => {
    e.preventDefault();
    console.log(systemId);
    if (!systemId) return "System id required";
    getMarketsBySystemId(systemId).then((data) => {
      console.log(data);
    });
  };

  const onCreateMarket = (e: any) => {
    e.preventDefault();
    console.log(marketData);
    if (!marketData) return "Market data not found";
    createNewMarket(marketData).then((data) => {
      console.log(data);
    });
  };

  const onDeleteMarket = (e: any) => {
    e.preventDefault();
    console.log(marketId);
    if (!marketId) return "Market id required";
    deleteMarketById(marketId).then((data) => {
      console.log(data);
    });
  };

  const onUpdateMarketResources = (e: any) => {
    e.preventDefault();
    console.log(resourceData);
    if (!resourceData) return "Resource data not found";
    updateMarketResourceByAmount(marketId, resourceData).then((data) => {
      console.log(data);
    });
  };

  const onUpdateMarketCronResources = (e: any) => {
    e.preventDefault();
    console.log(resourceData);
    if (!resourceData) return "Resource data not found";
    updateMarketCronResourceByAmount(marketId, resourceData).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl underline">Market</h1>
      <div className="flex gap-2 items-start flex-wrap">
        <Button onClick={onGetAllMarkets}>Get All</Button>

        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onGetMarketsBySystemId}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="systemId"
              placeholder="System Id"
              onChange={(e) => {
                setSystemId(e.target.value);
              }}
            />

            <Button type="submit" size="sm">
              Get Markets by SystemId
            </Button>
          </form>
        </div>
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
              name="positionX"
              placeholder="position x"
              onChange={(e) => {
                setMarketData((prev) => ({
                  ...prev,
                  positionX: e.target.value,
                }));
              }}
            />
            <input
              type="number"
              name="positionY"
              placeholder="position y"
              onChange={(e) => {
                setMarketData((prev) => ({
                  ...prev,
                  positionY: e.target.value,
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
            <div>
              <label htmlFor="landable" className="px-2">
                Landable
              </label>
              <input
                type="checkbox"
                name="landable"
                placeholder="landable"
                onChange={(e) => {
                  setMarketData((prev) => ({
                    ...prev,
                    landable: e.target.checked,
                  }));
                }}
              />
            </div>
            <div>
              <label htmlFor="mineable" className="px-2">
                Mineable
              </label>
              <input
                type="checkbox"
                name="mineable"
                placeholder="mineable"
                onChange={(e) => {
                  setMarketData((prev) => ({
                    ...prev,
                    mineable: e.target.checked,
                  }));
                }}
              />
            </div>
            <Button type="submit" size="sm">
              Add Market with default resources
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onDeleteMarket}
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

            <Button type="submit" size="sm">
              Delete Market by Id
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onUpdateMarketResources}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="marketId"
              placeholder="Market Id"
              onChange={(e) => {
                setMarketId(e.target.value);
                setResourceData((prev) => ({
                  ...prev,
                  marketId: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              name="resourceName"
              placeholder="Resource Name"
              onChange={(e) => {
                setResourceData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
            <input
              type="number"
              name="resourceAmount"
              placeholder="Resource Amount"
              onChange={(e) => {
                setResourceData((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }));
              }}
            />
            <input
              type="text"
              name="baseValue"
              placeholder="Base Value"
              onChange={(e) => {
                setResourceData((prev) => ({
                  ...prev,
                  baseValue: Number(e.target.value),
                }));
              }}
            />

            <Button type="submit" size="sm">
              Update Market Resources by Amount
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onUpdateMarketCronResources}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="marketId"
              placeholder="Market Id"
              onChange={(e) => {
                setMarketId(e.target.value);
                setResourceData((prev) => ({
                  ...prev,
                  marketId: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              name="resourceName"
              placeholder="Resource Name"
              onChange={(e) => {
                setResourceData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
            <input
              type="number"
              name="resourceAmount"
              placeholder="Resource Amount"
              onChange={(e) => {
                setResourceData((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }));
              }}
            />
            <input
              type="text"
              name="baseValue"
              placeholder="Base Value"
              onChange={(e) => {
                setResourceData((prev) => ({
                  ...prev,
                  baseValue: Number(e.target.value),
                }));
              }}
            />

            <Button type="submit" size="sm">
              Update Market Cron Resources by Amount
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarketCommands;
