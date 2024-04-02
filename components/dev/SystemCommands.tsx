"use client";

import {
  SystemData,
  addSystem,
  deleteSystemById,
  getAllSystems,
} from "@/actions/system";
import { useState } from "react";
import { Button } from "../ui/button";

const SystemCommands = () => {
  const [systemData, setSystemData] = useState<SystemData>();
  const [deleteSystemId, setDeleteSystemId] = useState<string>("");
  const onGetAllSystems = (e: any) => {
    e.preventDefault();
    getAllSystems().then((data) => {
      console.log(data);
    });
  };
  const onCreateSystem = (e: any) => {
    e.preventDefault();
    console.log(systemData);
    if (!systemData) return "System data not found";
    addSystem(systemData).then((data) => {
      console.log(data);
    });
  };

  const onDeleteSystem = (e: any) => {
    e.preventDefault();
    console.log(deleteSystemId);
    if (!deleteSystemId) return "System id required";
    deleteSystemById(deleteSystemId).then((data) => {
      console.log(data);
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl underline">System</h1>
      <div className="flex items-start gap-2">
        <Button onClick={onGetAllSystems}>Get All</Button>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={(e) => onCreateSystem(e)}
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
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={(e) => onDeleteSystem(e)}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="id"
              placeholder="System Id"
              onChange={(e) => {
                setDeleteSystemId(e.target.value);
              }}
            />
            <Button type="submit" size="sm">
              Delete System by Id
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SystemCommands;
