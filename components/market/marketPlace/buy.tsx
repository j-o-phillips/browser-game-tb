"use client";

import { getMarketData } from "@/actions/getMarketData";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Card from "@/customUi/Card";
import { MarketData } from "@/types";
import { Resource } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BuyScreen = () => {
  const { marketName } = useParams() as { marketName: string };
  const [marketData, setMarketData] = useState<MarketData | null>();
  const [resourceQuantities, setResourceQuantities] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getMarketData(marketName).then((data) => {
      setMarketData(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    const sum = Object.values(resourceQuantities)
      .map((value: any) => value.quantity * value.individualPrice)
      .reduce((a: any, b: any) => a + b, 0);
    setTotalPrice(sum);
  }, [resourceQuantities]);

  const handleInputChange = (
    resourceName: string,
    value: number,
    individualPrice: number
  ) => {
    setResourceQuantities((prev: any) => ({
      ...prev,
      [resourceName]: {
        quantity: value || 0,
        individualPrice: individualPrice,
      },
    }));
  };

  const handleBuy = () => {
    console.log(resourceQuantities);
  };

  return (
    <Card>
      <h2>Buy</h2>
      <table className="m-8 table-auto text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Quantity</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {marketData?.resources?.map((resource: Resource) => (
            <tr key={resource.id}>
              <td>{resource.name}</td>
              <td>{resource.baseValue}</td>
              <td>{resource.amount}</td>
              {/* <td className="w-full">
                <Slider
                  defaultValue={[0]}
                  max={resource.amount}
                  step={1}
                  onValueChange={(value) => console.log(value)}
                />
              </td> */}
              <td>
                <input
                  min={0}
                  type="number"
                  max={resource.amount}
                  name="amount"
                  value={resourceQuantities[resource.name]?.quantity || 0}
                  onChange={(e) =>
                    handleInputChange(
                      resource.name,
                      parseInt(e.target.value),
                      resource.baseValue
                    )
                  }
                />
              </td>
              <td>
                {resource.baseValue * resourceQuantities[resource.name] || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-4">
        <div>Total: {totalPrice} </div>
        <Button onClick={handleBuy}>Buy</Button>
      </div>
    </Card>
  );
};

export default BuyScreen;
