"use client";

import BuyScreen from "@/components/market/marketPlace/buy";
import SellScreen from "@/components/market/marketPlace/sell";

import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useUserContext } from "@/context/UserContext";
import Card from "@/customUi/Card";
import { MarketData } from "@/types";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MarketPlace = () => {
  const router = useRouter();
  const { globalData, setGlobalData } = useGlobalContext();
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    if (!userData) {
      router.push("/game");
    }
  }, [userData]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 py-10 text-primary-foreground px-4 gap-4">
        <SellScreen />
        <BuyScreen />
      </div>
      <Button onClick={() => router.push(`/game/${userData?.currentLoc}`)}>
        To Spaceport
      </Button>
    </>
  );
};

export default MarketPlace;
