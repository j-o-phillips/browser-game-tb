"use client";

import { GlobalContextData } from "@/types";
import { createContext, useContext, useState } from "react";

export type GlobalContext = {
  globalData: GlobalContextData;
  setGlobalData: (c: GlobalContextData) => void;
};

const GlobalContext = createContext<GlobalContext>({
  globalData: {
    targetName: null,
    targetPos: null,
    distanceToTarget: null,
    fuelRequiredToDest: null,
    eta: null,
    isTravelling: false,
    canLand: false,
  },
  setGlobalData: () => {},
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [globalData, setGlobalData] = useState<GlobalContextData>({
    targetName: null,
    targetPos: null,
    distanceToTarget: null,
    fuelRequiredToDest: null,
    eta: null,
    isTravelling: false,
    canLand: false,
  });
  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a dataprovider");
  }
  return context;
};
