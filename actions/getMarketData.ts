import { db } from "@/lib/db";

export const getMarketData = async (name: string) => {
  try {
    const user = await db.market.findFirst({ where: { name } });
    return user;
  } catch {
    return null;
  }
};
