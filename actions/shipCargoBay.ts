import { db } from "@/lib/db";

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
