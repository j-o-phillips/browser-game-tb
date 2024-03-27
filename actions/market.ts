"use server";

import { db } from "@/lib/db";

export const getMarketDataByName = async (name: string) => {
  try {
    const market = await db.market.findFirst({
      where: { name },
      include: { resources: true },
    });
    return market;
  } catch (error: any) {
    return error.message;
  }
};

export const getMarketDataById = async (id: string) => {
  try {
    const market = await db.market.findUnique({
      where: { id },
      include: { resources: true },
    });
    return market;
  } catch (error: any) {
    return error.message;
  }
};
