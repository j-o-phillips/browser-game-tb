"use client";

import { getUserById } from "@/actions/getUserById";
import { getMarketDataByName } from "@/actions/market";
import { sellResourceSelection } from "@/actions/resource";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import Card from "@/customUi/Card";
import { MarketData } from "@/types";
import { Resource } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SellScreen = () => {
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData, setUserData } = useUserContext();
  const [marketData, setMarketData] = useState<MarketData | null>();
  const { marketName } = useParams() as { marketName: string };
  const [resourceQuantities, setResourceQuantities] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getMarketDataByName(marketName).then((data) => {
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
    resourceId: string,
    resourceName: string,
    currentQuantity: number,
    value: number,
    individualPrice: number
  ) => {
    //check if user tries to buy more than current market quantity
    if (value > currentQuantity) return console.log("Not enough inventory");
    setResourceQuantities((prev: any) => ({
      ...prev,
      [resourceId]: {
        quantity: value || 0,
        individualPrice: individualPrice,
        resourceName: resourceName,
      },
    }));
  };

  const handleSell = () => {
    console.log(resourceQuantities);
    if (!marketData) return "Market data not found";
    if (!userData) return "User data not found";
    sellResourceSelection(
      resourceQuantities,
      marketData.id,
      userData.ship.shipCargoBay.id
    )
      .then((result) => {
        console.log(result);
        setMarketData(result);
        setResourceQuantities({});
      })
      .then(() => {
        getUserById(userData.id).then((data) => {
          setUserData(data);
        });
      });
  };

  return (
    <Card>
      <h2>Sell</h2>
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
          {userData?.ship.shipCargoBay.resources.map((resource: Resource) => (
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
                  value={resourceQuantities[resource.id]?.quantity || 0}
                  onChange={(e) =>
                    handleInputChange(
                      resource.id,
                      resource.name,
                      resource.amount,
                      parseInt(e.target.value),
                      resource.baseValue
                    )
                  }
                />
              </td>
              <td>
                {resource.baseValue *
                  resourceQuantities[resource.id]?.quantity || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-4">
        <div>Total: {totalPrice} </div>
        <Button onClick={handleSell}>Sell</Button>
      </div>
      <Button onClick={() => console.log(userData)}>Log user context</Button>
      <Button onClick={() => console.log(globalData)}>
        Log global context
      </Button>
    </Card>
  );
};

export default SellScreen;
