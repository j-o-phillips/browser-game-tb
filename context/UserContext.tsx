"use client";

import { User } from "@prisma/client";
import { createContext, useContext, useState } from "react";

export type UserContent = {
  data: User | null;
  setData: (c: User) => void;
};

const UserContext = createContext<UserContent>({
  data: null,
  setData: () => {},
});

export const UserProvider = ({ children }) => {
  const [data, setData] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a dataprovider");
  }
  return context;
};
