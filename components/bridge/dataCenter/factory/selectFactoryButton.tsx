import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import { Factory } from "@prisma/client";
import { useState } from "react";

const SelectFactoryButton = () => {
  const { userData } = useUserContext();
  const { globalData, setGlobalData } = useGlobalContext();

  const handleSelectFactory = (value: string) => {
    //find factory by id
    const selectedFactory = userData?.Factories.find(
      (factory) => factory.id === value
    );
    if (!selectedFactory) return console.log("Factory not found");
    setGlobalData({ ...globalData, currentFactoryData: selectedFactory });
  };

  return (
    <Select onValueChange={handleSelectFactory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Factory" />
      </SelectTrigger>
      <SelectContent>
        {userData?.Factories.map((factory) => (
          <SelectItem value={factory.id} key={factory.id}>
            {factory.id}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFactoryButton;
