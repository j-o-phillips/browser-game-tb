"use client";

import { getMarketData } from "@/actions/getMarketData";
import { Market } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MarketPlace = () => {
  //!REPLACE ANY WITH MARKETPLACE DATA
  const [marketData, setMarketData] = useState<any>();
  const { marketName } = useParams() as { marketName: string };

  useEffect(() => {
    getMarketData(marketName).then((data) => {
      setMarketData(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 py-10">
      <div className="h-[50vh]  w-full flex flex-col items-center py-2 ">
        <h2>Sell</h2>
        <p>Description and details</p>
      </div>

      <div className="h-[50vh]  w-full flex flex-col items-center gap-2 py-2">
        <h2>Buy</h2>
        {marketData?.resources?.map((resource: any) => (
          <div key={resource.id}>
            {resource.name}, price: {resource.baseValue}, amount:{" "}
            {resource.amount}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPlace;
