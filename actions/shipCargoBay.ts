import { db } from "@/lib/db";
import { ShipCargoBaySaleTemplate } from "@prisma/client";

export const getShipCargoBayById = async (id: string) => {
  try {
    const shipCargoBay = await db.shipCargoBay.findUnique({
      where: { id },
      include: {
        resources: true,
      },
    });
    return shipCargoBay;
  } catch (error: any) {
    return error.message;
  }
};

export const updateShipCargoBayById = async (
  engineId: string,
  data: ShipCargoBaySaleTemplate
) => {
  try {
    const shipCargoBay = await db.shipCargoBay.update({
      where: { id: engineId },
      data: {
        name: data.name,
        currentDamage: data.currentDamage,
        maxCapacity: data.maxCapacity,

        price: data.price,
      },
    });
    return shipCargoBay;
  } catch (error: any) {
    return error.message;
  }
};
