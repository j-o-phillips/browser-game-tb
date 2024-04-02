import {
  deleteCronResourceById,
  getCronResourceById,
  getCronResourcesByMarketId,
  updateCronResourceAmountById,
} from "@/actions/cronResource";
import { useState } from "react";
import { Button } from "../ui/button";
import { on } from "events";

const CronResourceCommands = () => {
  const [cronResourceId, setCronResourceId] = useState<string>("");
  const [containerId, setContainerId] = useState<string>("");
  const [newAmount, setNewAmount] = useState<number>(0);
  const onGetCronResourceById = (e: any) => {
    e.preventDefault();
    getCronResourceById(cronResourceId).then((data) => {
      console.log(data);
    });
  };

  const onGetCronResourcesByMarketId = (e: any) => {
    e.preventDefault();
    console.log(containerId);
    if (!containerId) return "Market id or ship cargo bay id required";
    getCronResourcesByMarketId(containerId).then((data) => {
      console.log(data);
    });
  };

  const onUpdateCronResourceAmountById = (e: any) => {
    e.preventDefault();
    updateCronResourceAmountById(cronResourceId, newAmount).then((data) => {
      console.log(data);
    });
  };

  const onDeleteCronResourceById = (e: any) => {
    e.preventDefault();
    console.log(cronResourceId);
    if (!cronResourceId) return "Resource id required";
    deleteCronResourceById(cronResourceId).then((data) => {
      console.log(data);
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl underline">Cron Resource</h1>
      <div className="flex items-start gap-2 flex-wrap">
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onGetCronResourceById}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="resourceId"
              placeholder="Resource Id"
              onChange={(e) => {
                setCronResourceId(e.target.value);
              }}
            />
            <Button type="submit" size="sm">
              Get Resource by Id
            </Button>
          </form>
        </div>
        <div className="border border-black rounded-xl  flex flex-col items-center justify-center  text-center p-4">
          <form
            onSubmit={onGetCronResourcesByMarketId}
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
            onSubmit={onUpdateCronResourceAmountById}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="resourceId"
              placeholder="ResourcId"
              onChange={(e) => setCronResourceId(e.target.value)}
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
            onSubmit={onDeleteCronResourceById}
            className="flex flex-col gap-4 text-center"
          >
            <input
              type="text"
              name="resourceId"
              placeholder="Resource Id"
              onChange={(e) => setCronResourceId(e.target.value)}
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

export default CronResourceCommands;
