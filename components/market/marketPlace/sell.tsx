"use client";

import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import Card from "@/customUi/Card";

const SellScreen = () => {
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData, setUserData } = useUserContext();
  return (
    <Card>
      <h2>Sell</h2>
      <p>Description and details</p>
      <Button onClick={() => console.log(userData)}>Log user context</Button>
      <Button onClick={() => console.log(globalData)}>
        Log global context
      </Button>
    </Card>
  );
};

export default SellScreen;
