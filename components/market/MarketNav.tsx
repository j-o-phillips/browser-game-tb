"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const MarketNav = () => {
  const router = useRouter();
  const { marketName } = useParams() as { marketName: string };
  return (
    <div className=" flex flex-col items-center gap-2 py-2">
      <h2>Navigation</h2>
      <Button onClick={() => router.push(`${marketName}/market`)}>
        Marketplace
      </Button>
    </div>
  );
};

export default MarketNav;
