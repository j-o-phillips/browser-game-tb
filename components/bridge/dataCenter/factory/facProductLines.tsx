import { addFactoryProductionLine } from "@/actions/factory";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import FacProdLineOptions from "./facProdLineOptions";

const FacProductLines = () => {
  const { userData, setUserData } = useUserContext();
  const { globalData, setGlobalData } = useGlobalContext();

  const [lineType, setLineType] = useState<string | undefined>();

  const handleAddProductionLine = (factoryId: string, newLine: string) => {
    try {
      addFactoryProductionLine(factoryId, newLine).then((data) => {
        setGlobalData({ ...globalData, currentFactoryData: data });
        //set factory in user data with new production line
        if (!userData?.Factories) return console.log("no user data");
        setUserData({
          ...userData,
          Factories: userData?.Factories.map((factory) => {
            if (factory.id === factoryId) {
              factory = data;
            }
            return factory;
          }),
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Production Lines</h1>
      {globalData.currentFactoryData?.productionLines?.map((line) => (
        <FacProdLineOptions line={line} key={line.id} />
      ))}
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Choose Resource</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Production Line Resource</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={lineType}
              onValueChange={setLineType}
            >
              <DropdownMenuRadioItem value="Fuel">Fuel</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={() => {
            if (!lineType || !globalData.currentFactoryData)
              return console.log("no line type selected or no factory data");
            handleAddProductionLine(globalData.currentFactoryData.id, lineType);
          }}
        >
          Add {lineType} production line
        </Button>
      </div>
    </>
  );
};

export default FacProductLines;
