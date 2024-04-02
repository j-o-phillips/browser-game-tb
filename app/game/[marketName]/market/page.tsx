"use client";

import BuyScreen from "@/components/market/marketPlace/buy";
import MarketDetails from "@/components/market/marketPlace/marketDetails";
import PlayerDetails from "@/components/market/marketPlace/playerDetails";
import SellScreen from "@/components/market/marketPlace/sell";

const MarketPlace = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 py-10 text-primary-foreground px-4 gap-4">
        <PlayerDetails />
        <MarketDetails />
        <SellScreen />
        <BuyScreen />
      </div>
    </>
  );
};

export default MarketPlace;
