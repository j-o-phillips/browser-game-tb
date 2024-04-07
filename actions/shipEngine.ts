"use server";

import { db } from "@/lib/db";
import { ShipEngineSaleTemplate } from "@prisma/client";

export const updateShipEngineById = async (
  engineId: string,
  data: ShipEngineSaleTemplate
) => {
  try {
    const shipEngine = await db.shipEngine.update({
      where: { id: engineId },
      data: {
        name: data.name,
        currentDamage: data.currentDamage,
        fuelConsumption: data.fuelConsumption,
        speed: data.speed,
        price: data.price,
        maxJump: data.maxJump,
      },
    });
    return shipEngine;
  } catch (error: any) {
    return error.message;
  }
};
