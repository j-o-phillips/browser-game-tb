import { useState } from "react";

import { Factory } from "@prisma/client";
import SelectFactoryButton from "./selectFactoryButton";
import Warehouse from "./warehouse";
import { useGlobalContext } from "@/context/GlobalContext";
import FacProductLines from "./facProductLines";

const FactoryScreen = () => {
  return (
    <div className="flex gap-4 w-full">
      <div className="  w-1/2 flex flex-col gap-2">
        {" "}
        <SelectFactoryButton />
        <FacProductLines />
      </div>
      <div className="  w-1/2">
        <Warehouse />
      </div>
    </div>
  );
};

export default FactoryScreen;
