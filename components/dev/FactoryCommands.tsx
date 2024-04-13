import { useState } from "react";
import { Button } from "../ui/button";
import {
  CreateFactoryData,
  createFactory,
  deleteFactoryById,
  getAllFactories,
  getFactoryById,
} from "@/actions/factory";

const FactoryCommands = () => {
  const [factoryData, setFactoryData] = useState<CreateFactoryData>({
    userId: "",
    marketId: "",
  });
  const [factoryId, setFactoryId] = useState<string>("");

  const onGetAllFactories = () => {
    getAllFactories().then((data) => {
      console.log(data);
    });
  };
  const onGetFactoryById = (e: any) => {
    e.preventDefault();
    console.log(factoryId);
    if (!factoryId) return "System id required";
    getFactoryById(factoryId).then((data) => {
      console.log(data);
    });
  };
  const onCreateFactory = (e: any) => {
    e.preventDefault();
    console.log(factoryData);
    if (!factoryData) return "Market data not found";
    createFactory(factoryData).then((data) => {
      console.log(data);
    });
  };
  const onDeleteFactory = (e: any) => {
    e.preventDefault();
    console.log(factoryId);
    if (!factoryId) return "Market id required";
    deleteFactoryById(factoryId).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl underline">Factory</h1>
      <div className="flex gap-2 items-start flex-wrap">
        <Button onClick={onGetAllFactories}>Get All</Button>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onGetFactoryById}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="systemId"
              placeholder="System Id"
              onChange={(e) => {
                setFactoryId(e.target.value);
              }}
            />
            <Button type="submit" size="sm">
              Get Factory by Id
            </Button>
          </form>
        </div>

        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onCreateFactory}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="userId"
              placeholder="User Id"
              onChange={(e) => {
                setFactoryData((prev) => ({
                  ...prev,
                  userId: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              name="marketId"
              placeholder="Market Id"
              onChange={(e) => {
                setFactoryData((prev) => ({
                  ...prev,
                  marketId: e.target.value,
                }));
              }}
            />

            <Button type="submit" size="sm">
              Create Factory on Market
            </Button>
          </form>
        </div>

        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onDeleteFactory}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="factoryId"
              placeholder="Factory Id"
              onChange={(e) => {
                setFactoryId(e.target.value);
              }}
            />
            <Button type="submit" size="sm">
              Delete Factory by Id
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FactoryCommands;
