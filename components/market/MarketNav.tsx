"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Card from "@/customUi/Card";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { getMarketDataByName } from "@/actions/market";
import { MarketData } from "@/types";
import { buyFactory } from "@/actions/trade";

const MarketNav = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserContext();
  const { marketName } = useParams() as { marketName: string };
  const [marketData, setMarketData] = useState<MarketData | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      router.push("/game");
    }
  }, [userData]);

  useEffect(() => {
    setLoading(true);

    getMarketDataByName(marketName).then((data) => {
      setMarketData(data);
      console.log(data);
      setLoading(false);
    });
  }, [userData]);

  const handleBuyFactory = () => {
    setLoading(true);

    if (!userData || !marketData) {
      return console.log("Data not found");
    }
    if (userData.credits < 20000) {
      return console.log("Not enough credits");
    }
    try {
      buyFactory(userData?.id, userData?.credits, marketData?.id)
        .then((data) => {
          setUserData(data);
          console.log(data);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="text-red-500">Loading</div>;
  }

  const marketId = marketData?.id;

  return (
    <Card>
      <h2>Navigation</h2>
      <Button onClick={() => router.push(`${marketName}/market`)}>
        Marketplace
      </Button>
      <Button onClick={() => router.push(`${marketName}/shipyard`)}>
        Shipyard
      </Button>
      {!loading &&
        !userData?.Factories.find(
          (factory) => factory.marketId === marketData?.id
        ) && (
          <Button onClick={handleBuyFactory}>
            Buy Factory (20000 credits)
          </Button>
        )}

      <Button onClick={() => router.push("bridge")}>Board Ship</Button>
    </Card>
  );
};

export default MarketNav;
