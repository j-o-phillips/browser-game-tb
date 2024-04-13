"use client";

import { useUserContext } from "@/context/UserContext";
import Card from "@/customUi/Card";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { addFactoryProductionLine } from "@/actions/factory";
import { Factory } from "@prisma/client";
import ProductionLineOptions from "./productionLineOptions";

const ProductionLines = () => {
  const router = useRouter();
  const { userData } = useUserContext();
  const { marketId } = useParams() as { marketId: string };
  const [factoryData, setFactoryData] = useState<Factory | null>();
  const [lineType, setLineType] = useState<string | undefined>();

  useEffect(() => {
    const currentFactoryData = userData?.Factories.find(
      (factory) => factory.marketId === marketId
    );
    setFactoryData(currentFactoryData);
    console.log(currentFactoryData);
  }, []);

  const handleAddProductionLine = (factoryId: string, newLine: string) => {
    try {
      addFactoryProductionLine(factoryId, newLine).then((data) => {
        setFactoryData(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <h1>Production Lines</h1>
      {factoryData?.productionLines.map((line) => (
        <ProductionLineOptions key={line} />
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
            if (!lineType || !factoryData)
              return console.log("no line type selected or no factory data");
            handleAddProductionLine(factoryData.id, lineType);
          }}
        >
          Add {lineType} production line
        </Button>
      </div>

      <Button onClick={() => console.log(userData)}>Log user data</Button>
      <Button onClick={() => router.push(`/game/${userData?.currentLoc}`)}>
        To Spaceport
      </Button>
    </Card>
  );
};

export default ProductionLines;
