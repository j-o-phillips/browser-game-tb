"use client";

import { getMarketData } from "@/actions/getMarketData";
import MarketNav from "@/components/market/MarketNav";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MarketPage = () => {
  const [marketData, setMarketData] = useState({});
  const { marketName } = useParams() as { marketName: string };

  useEffect(() => {
    getMarketData(marketName).then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="h-[50vh]  w-full flex flex-col items-center py-2 ">
        <h2>Welcome to {marketName} spaceport</h2>
        <p>Description and details</p>
      </div>
      <div className="h-[50vh]  w-full flex flex-col items-center py-2 ">
        <h2>{marketName}</h2>
        <h2>Planet/spaceport image</h2>
      </div>
      <div className="h-[50vh]  w-full ">
        <MarketNav />
      </div>
      <div className="h-[50vh]  w-full flex flex-col items-center gap-2 py-2">
        <h2>Something else</h2>
      </div>
    </div>
  );
};

export default MarketPage;
