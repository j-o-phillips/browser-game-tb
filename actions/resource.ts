"use server";

import { db } from "@/lib/db";

export const getResourceById = async (id: string) => {
  try {
    const resource = await db.resource.findUnique({
      where: { id },
    });
    return resource;
  } catch (error: any) {
    return error.message;
  }
};

export const getResourcesByShipCargoBayOrMarketId = async ({
  marketId,
  shipCargoBayId,
}: {
  marketId?: string;
  shipCargoBayId?: string;
}) => {
  try {
    let whereClause = {};
    if (marketId) {
      whereClause = { marketId };
    } else if (shipCargoBayId) {
      whereClause = { shipCargoBayId };
    } else {
      throw new Error("Either marketId or shipCargoBayId must be provided");
    }

    const resources = await db.resource.findMany({
      where: whereClause,
    });
    return resources;
  } catch (error: any) {
    return error.message;
  }
};

export type CreateResourceData = {
  name: string;
  amount: number;
  baseValue: number;
  marketId?: string;
  shipCargoBayId?: string;
};

export const createResourceInMarketOrShipCargoBay = async (
  resourceData: CreateResourceData
) => {
  try {
    const resource = await db.resource.create({
      data: resourceData,
    });
    return resource;
  } catch (error: any) {
    return error.message;
  }
};

export const updateResourceAmountById = async (
  id: string,
  newAmount: number
) => {
  try {
    await db.resource.update({
      where: { id },
      data: {
        amount: newAmount,
      },
    });
    return { success: "Resource updated!" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteResourceById = async (id: string) => {
  try {
    await db.resource.delete({
      where: { id },
    });
    return { success: "Resource deleted!" };
  } catch (error: any) {
    return { error: error.message };
  }
};
