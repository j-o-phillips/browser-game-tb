"use server";

import { db } from "@/lib/db";
import { getShipCargoBayById } from "./shipCargoBay";
import { Resource, ShipCargoBay } from "@prisma/client";

//! CRUD

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

//! COMPOSITE

export const createOrUpdateResourceInmarketOrShipCargoBay = async (
  resourceData: CreateResourceData,
  shipCargoBay?: ShipCargoBay & { resources: Resource[] }
) => {
  let foundShipCargoBay;
  if (shipCargoBay) foundShipCargoBay = shipCargoBay;
  else {
    if (!resourceData.shipCargoBayId) return "Ship cargo bay Id not provided";
    shipCargoBay = await getShipCargoBayById(resourceData.shipCargoBayId);
    if (!shipCargoBay) return "Ship cargo bay not found";
  }

  try {
    //? Add resources to ship cargo

    // Check if resource is already in cargo
    const existingResourceInCargo = shipCargoBay.resources.find(
      (resource: Resource) => resource.name === resourceData.name
    );

    // Create new resource if not in cargo
    if (!existingResourceInCargo) {
      await createResourceInMarketOrShipCargoBay({
        name: resourceData.name,
        amount: resourceData.amount,
        baseValue: resourceData.baseValue,
        shipCargoBayId: resourceData.shipCargoBayId,
        marketId: resourceData.marketId,
      });
    }
    //Update resource in cargo if it exists
    else {
      const newAmount = existingResourceInCargo.amount + resourceData.amount;
      await updateResourceAmountById(existingResourceInCargo.id, newAmount);
    }
    return { success: "Resource updated!" };
  } catch (error: any) {
    return error.message;
  }
};
