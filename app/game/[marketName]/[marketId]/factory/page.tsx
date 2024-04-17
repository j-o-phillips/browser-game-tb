"use client";

import { getMarketDataByName } from "@/actions/market";
import ProductionLines from "@/components/factory/productionLines";
import Warehouse from "@/components/factory/warehouse";

import { useUserContext } from "@/context/UserContext";

const Factory = () => {
  const { userData } = useUserContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:h-screen py-10 text-primary-foreground px-4 gap-4">
      <ProductionLines />
      <Warehouse />
    </div>
  );
};

export default Factory;
