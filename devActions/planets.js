"use server";

import { db } from "@/lib/db";

export const addMarket = async (incomingData) => {
  const { name, resources, systemId, positionX, positionY } = incomingData;
  console.log(incomingData);

  try {
    const market = await db.market.create({
      data: {
        name: name,
        systemId: systemId,
        position: [Number(positionX), Number(positionY)],
      },
    });

    const resourcesData = [
      {
        name: "Iron",
        amount: 1000,
        baseValue: 20,
      },
      {
        name: "Oxygen",
        amount: 1000,
        baseValue: 50,
      },
      {
        name: "Food",
        amount: 1000,
        baseValue: 10,
      },
      {
        name: "Fuel",
        amount: 1000,
        baseValue: 20,
      },
    ];

    const createdResources = await Promise.all(
      resourcesData.map(async (resourceData) => {
        return await db.resource.create({
          data: {
            ...resourceData,
            marketId: market.id, // Link the resource to the newly created market
          },
        });
      })
    );
    return { success: "Market created!" };
  } catch (error) {
    return { error: error.message };
  }
};
