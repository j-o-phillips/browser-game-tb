"use server";

import { db } from "@/lib/db";

export type CreateShipEngineSaleTemplateData = {
  name: string;
  currentDamage: number;
  fuelConsumption: number;
  speed: number;
  price: number;
  maxJump: number;
};

export const createShipEngineSaleTemplate = async (
  data: CreateShipEngineSaleTemplateData
) => {
  try {
    const shipEngineSaleTemplate = await db.shipEngineSaleTemplate.create({
      data,
    });
    return shipEngineSaleTemplate;
  } catch (error: any) {
    return error.message;
  }
};

export const connectShipTemplateToMarket = async (
  templateId: string,
  marketId: string
) => {
  try {
    // Add the Market to the ShipEngineSaleTemplate's markets array
    const updatedMarket = await db.market.update({
      where: { id: marketId },
      data: {
        shipEngineSaleTemplates: {
          connect: { id: templateId }, // Connect the Market to the ShipEngineSaleTemplate
        },
      },
    });

    return updatedMarket;
  } catch (error) {
    console.error("Error connecting ShipEngineSaleTemplate to Market:", error);
  }
};
