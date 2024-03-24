"use client";

import { getMarketData } from "@/actions/getMarketData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MarketPage = () => {
  const [marketData, setMarketData] = useState({});
  const { marketName } = useParams() as { marketName: string };

  useEffect(() => {
    getMarketData(marketName).then((data) => {
      // setMarketData(data);
    });
  });
  return (
    <div className="py-10 flex h-screen justify-around">
      <div className="h-3/5 border border-black w-2/5"></div>
      <div className="h-3/5 border border-black w-2/5"></div>
    </div>
  );
};

export default MarketPage;
