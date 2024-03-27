"use server";

import { db } from "@/lib/db";
import { getMarketDataById } from "./market";
import { MarketData } from "@/types";
export const buyResourceSelection = async (
  data: object,
  marketId: string,
  shipCargoBayId: string
) => {
  //Cycle through the resources to be updated
  for (const [key, value] of Object.entries(data)) {
    //Find current resource
    const currentResourceInMarket = await db.resource.findUnique({
      where: {
        id: key,
      },
    });

    //! TODO: Perform validation and price/amount match

    if (!currentResourceInMarket) return "Resource not found";
    if (currentResourceInMarket.amount < value.quantity)
      return "Not enough inventory";
    //! Check if this works!
    if (currentResourceInMarket.amount !== value.currentQuantityInMarketplace)
      return "Marketplace inventory mismatch";

    //? Add resources to ship cargo
    //Find cargo bay
    const shipCargoBay = await db.shipCargoBay.findUnique({
      where: {
        id: shipCargoBayId,
      },
      include: {
        resources: true,
      },
    });

    if (!shipCargoBay) return "Ship cargo bay not found";
    // Check if resource is already in cargo
    const existingResourceInCargo = shipCargoBay.resources.find(
      (resource) => resource.name === value.resourceName
    );

    // Create new resource if not in cargo
    if (!existingResourceInCargo) {
      await db.resource.create({
        data: {
          amount: value.quantity,
          baseValue: value.individualPrice,
          name: value.resourceName,
          shipCargoBayId: shipCargoBayId,
        },
      });
    }
    //Update resource in cargo if it exists
    else {
      await db.resource.update({
        where: {
          id: existingResourceInCargo.id,
        },
        data: {
          amount: existingResourceInCargo.amount + value.quantity,
        },
      });
    }

    //Reduce in market
    const newAmount = currentResourceInMarket.amount - value.quantity;
    await db.resource.update({
      where: {
        id: key,
      },
      data: {
        amount: newAmount,
      },
    });
  }

  //get updated market data and return it
  const newMarketData = await getMarketDataById(marketId);
  return newMarketData;
};

export const sellResourceSelection = async (
  data: object,
  marketId: string,
  shipCargoBayId: string
) => {
  //Cycle through the resources to be updated
  for (const [key, value] of Object.entries(data)) {
    //Find current resource
    const currentResourceInShipCargo = await db.resource.findUnique({
      where: {
        id: key,
      },
    });

    //! TODO: Perform validation and price/amount match
    if (!currentResourceInShipCargo) return "Resource not found";
    if (currentResourceInShipCargo.amount < value.quantity)
      return "Not enough inventory";

    //? Add resources to market Inventory
    //Find market resources
    const market: MarketData = await getMarketDataById(marketId);

    if (!market) return "Market name not found";
    // Resource should always exist in market
    const existingResourceInMarket = market.resources.find(
      (resource) => resource.name === value.resourceName
    );
    //Update resource in cargo if it exists
    if (!existingResourceInMarket) return "Resource not found in market";

    await db.resource.update({
      where: {
        id: existingResourceInMarket.id,
      },
      data: {
        amount: existingResourceInMarket.amount + value.quantity,
      },
    });

    //Reduce in ship cargo
    const newAmount = currentResourceInShipCargo.amount - value.quantity;
    await db.resource.update({
      where: {
        id: key,
      },
      data: {
        amount: newAmount,
      },
    });
  }

  //get updated market data and return it
  const newMarketData = await getMarketDataById(marketId);
  return newMarketData;
};
