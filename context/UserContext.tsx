"use client";

import { User } from "@prisma/client";
import { createContext, useContext, useState } from "react";

export type UserContent = {
  userData: User | null;
  setUserData: (c: User) => void;
};

const UserContext = createContext<UserContent>({
  userData: null,
  setUserData: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | null>(null);
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
