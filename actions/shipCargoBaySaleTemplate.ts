"use server";

import { db } from "@/lib/db";

export type CreateShipCargoBaySaleTemplateData = {
  name: string;
  currentDamage: number;
  maxCapacity: number;
  price: number;
};

export const createShipCargoBaySaleTemplate = async (
  data: CreateShipCargoBaySaleTemplateData
) => {
  try {
    const shipCargoBaySaleTemplate = await db.shipCargoBaySaleTemplate.create({
      data,
    });
    return shipCargoBaySaleTemplate;
  } catch (error: any) {
    return error.message;
  }
};

export const connectShipCargoBayTemplateToMarket = async (
  templateId: string,
  marketId: string
) => {
  try {
    // Add the Market to the ShipCargoBaySaleTemplate's markets array
    const updatedMarket = await db.market.update({
      where: { id: marketId },
      data: {
        shipCargoBaySaleTemplates: {
          connect: { id: templateId }, // Connect the Market to the ShipCargoBaySaleTemplate
        },
      },
    });

    return updatedMarket;
  } catch (error) {
    console.error(
      "Error connecting ShipCargoBaySaleTemplate to Market:",
      error
    );
  }
};
