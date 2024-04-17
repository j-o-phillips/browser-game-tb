"use client";

import {
  Factory,
  ProductionLine,
  Resource,
  Ship,
  ShipCargoBay,
  ShipEngine,
  User,
} from "@prisma/client";
import { createContext, useContext, useState } from "react";

type UserData = User & {
  ship: Ship & {
    shipEngine: ShipEngine;
    shipCargoBay: ShipCargoBay & {
      resources: Resource[];
    };
  };
  Factories: (Factory & { productionLines: ProductionLine[] | null })[];
};
export type UserContent = {
  userData: UserData | null;
  setUserData: (c: UserData) => void;
};

const UserContext = createContext<UserContent>({
  userData: null,
  setUserData: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a userDataprovider");
  }
  return context;
};
