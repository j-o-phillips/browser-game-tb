"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Card from "@/customUi/Card";

const MarketNav = () => {
  const router = useRouter();
  const { marketName } = useParams() as { marketName: string };
  return (
    <Card>
      <h2>Navigation</h2>
      <Button onClick={() => router.push(`${marketName}/market`)}>
        Marketplace
      </Button>
      <Button onClick={() => router.push("bridge")}>Board Ship</Button>
    </Card>
  );
};

export default MarketNav;
