"use server";

import { db } from "@/lib/db";

export const addMarket = async (incomingData) => {
  const { name, resources, systemId, position } = incomingData;

  await db.market.create({
    data: {
      name: name,
      resources: Number(resources),
      systemId: systemId,
      position: [10, 10],
    },
  });

  return { success: "Market created!" };
};
