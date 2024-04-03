"use server";

import { db } from "@/lib/db";

export const getShipById = async (id: string) => {
  try {
    const ship = await db.ship.findUnique({
      where: { id },
      include: {
        shipCargoBay: { include: { resources: true } },
        shipEngine: true,
      },
    });
    return ship;
  } catch (error: any) {
    return { error: error.message };
  }
};
//test

export const updateShipFuelByid = async (id: string, amount: number) => {
  try {
    const ship = await db.ship.update({
      where: { id },
      data: {
        fuel: amount,
      },
      include: {
        shipCargoBay: { include: { resources: true } },
        shipEngine: true,
      },
    });
    return ship;
  } catch (error: any) {
    return { error: error.message };
  }
};
