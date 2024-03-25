"use server";

import { db } from "@/lib/db";

export const getMarketData = async (name: string) => {
  try {
    const market = await db.market.findFirst({
      where: { name },
      include: { resources: true },
    });
    return market;
  } catch {
    return null;
  }
};
