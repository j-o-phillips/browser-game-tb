"use server";

import { db } from "@/lib/db";
import {
  CreateResourceData,
  createResourceInMarketOrShipCargoBay,
  getResourcesByShipCargoBayOrMarketId,
  updateResourceAmountById,
} from "./resource";
import { Cronresource, Resource } from "@prisma/client";

//! CRUD
export const getAllMarkets = async () => {
  try {
    const markets = await db.market.findMany({
      include: { resources: true, cronResources: true },
    });
    return markets;
  } catch (error: any) {
    return error.message;
  }
};

export const getMarketDataByName = async (name: string) => {
  try {
    const market = await db.market.findFirst({
      where: { name },
      include: { resources: true },
    });
    return market;
  } catch (error: any) {
    return error.message;
  }
};

export const getMarketDataById = async (id: string) => {
  try {
    const market = await db.market.findUnique({
      where: { id },
      include: { resources: true },
    });
    return market;
  } catch (error: any) {
    return error.message;
  }
};

export const getMarketsBySystemId = async (systemId: string) => {
  try {
    const markets = await db.market.findMany({
      where: { systemId },
      include: { resources: true },
    });
    return markets;
  } catch (error: any) {
    return error.message;
  }
};

export type CreateMarketData = {
  name: string;

  systemId: string;
  positionX: string;
  positionY: string;
};
export const createNewMarket = async (incomingData: CreateMarketData) => {
  const { name, systemId, positionX, positionY } = incomingData;
  console.log(incomingData);

  try {
    const market = await db.market.create({
      data: {
        name: name,
        systemId: systemId,
        position: [Number(positionX), Number(positionY)],
      },
    });

    const resourcesData = [
      {
        name: "Iron",
        amount: 1000,
        baseValue: 20,
      },
      {
        name: "Oxygen",
        amount: 1000,
        baseValue: 50,
      },
      {
        name: "Food",
        amount: 1000,
        baseValue: 10,
      },
      {
        name: "Fuel",
        amount: 1000,
        baseValue: 20,
      },
    ];

    const createdResources = await Promise.all(
      resourcesData.map(async (resourceData) => {
        return await db.resource.create({
          data: {
            ...resourceData,
            marketId: market.id, // Link the resource to the newly created market
          },
        });
      })
    );
    return { success: "Market created!" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteMarketById = async (id: string) => {
  try {
    await db.market.delete({
      where: { id },
    });
    return { success: "Market deleted!" };
  } catch (error: any) {
    return { error: error.message };
  }
};

//!COMPOSITE

export const updateMarketResourceByAmount = async (
  marketId: string,
  resource: CreateResourceData
) => {
  try {
    //check if resource exists on market
    const existingResources = await getResourcesByShipCargoBayOrMarketId({
      marketId: marketId,
    });
    const resourceExists = existingResources.find(
      (r: Resource) => r.name === resource.name
    );

    //If resource exists on market, update amount
    if (resourceExists) {
      await updateResourceAmountById(resourceExists.id, resource.amount);
    }

    //If resource does not exist on market, create new resource
    else {
      await createResourceInMarketOrShipCargoBay(resource);
    }
    return { success: "Resource updated!" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updateMarketCronResourceByAmount = async (
  marketId: string,
  resource: CreateResourceData
) => {
  try {
    //check if cron resource exists on market
    const existingResources = await db.cronresource.findMany({
      where: { marketId: marketId },
    });

    const resourceExists = existingResources.find(
      (r: Cronresource) => r.name === resource.name
    );

    //If resource exists on market, update amount
    if (resourceExists) {
      await db.cronresource.update({
        where: { id: resourceExists.id },
        data: {
          amount: resource.amount,
        },
      });
    }

    //If resource does not exist on market, create new resource
    else {
      await db.cronresource.create({
        data: {
          ...resource,
          marketId: marketId,
        },
      });
    }
    return { success: "Cron Resource updated!" };
  } catch (error: any) {
    return { error: error.message };
  }
};
