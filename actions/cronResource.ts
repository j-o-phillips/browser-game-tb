"use server";

import { db } from "@/lib/db";

export const getCronResourceById = async (id: string) => {
  try {
    const cronResource = await db.cronresource.findUnique({
      where: { id },
    });
    return cronResource;
  } catch (error: any) {
    return error.message;
  }
};

export const getCronResourcesByMarketId = async (marketId: string) => {
  try {
    const cronResources = await db.cronresource.findMany({
      where: { marketId },
    });
    return cronResources;
  } catch (error: any) {
    return error.message;
  }
};

export type CreateResourceData = {
  name: string;
  amount: number;
  baseValue: number;
  marketId: string;
};

export const createResourceInMarket = async (
  resourceData: CreateResourceData
) => {
  try {
    const cronResource = await db.cronresource.create({
      data: resourceData,
    });
    return cronResource;
  } catch (error: any) {
    return error.message;
  }
};

export const updateCronResourceAmountById = async (
  id: string,
  newAmount: number
) => {
  try {
    await db.cronresource.update({
      where: { id },
      data: {
        amount: newAmount,
      },
    });
    return { success: "Cron Resource updated!" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteCronResourceById = async (id: string) => {
  try {
    await db.cronresource.delete({
      where: { id },
    });
    return { success: "Cron Resource deleted!" };
  } catch (error: any) {
    return { error: error.message };
  }
};
