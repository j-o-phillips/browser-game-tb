"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Card from "@/customUi/Card";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";

const MarketNav = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    if (!userData) {
      router.push("/game");
    }
  }, [userData]);
  const { marketName } = useParams() as { marketName: string };
  return (
    <Card>
      <h2>Navigation</h2>
      <Button onClick={() => router.push(`${marketName}/market`)}>
        Marketplace
      </Button>
      <Button onClick={() => router.push(`${marketName}/shipyard`)}>
        Shipyard
      </Button>
      <Button onClick={() => {}} disabled>
        Build Factory
      </Button>
      <Button onClick={() => router.push("bridge")}>Board Ship</Button>
    </Card>
  );
};

export default MarketNav;
