"use server";

import { db } from "@/lib/db";

export const updateShipFuelByid = async (id: string, amount: number) => {
  try {
    const ship = await db.ship.update({
      where: { id },
      data: {
        fuel: amount,
      },
    });
    return ship;
  } catch (error: any) {
    return { error: error.message };
  }
};
