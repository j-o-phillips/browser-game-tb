"use server";

import { db } from "@/lib/db";
import { getMarketDataById } from "./market";
import { MarketData } from "@/types";
import {
  createResourceInMarketOrShipCargoBay,
  getResourceById,
  updateResourceAmountById,
} from "./resource";
import { getUserById, updateUserCredits } from "./user";
export const buyResourceSelection = async (
  data: object,
  marketId: string,
  shipCargoBayId: string,
  userId: string,
  totalPrice: number
) => {
  //Cycle through the resources to be updated
  for (const [key, value] of Object.entries(data)) {
    //Find current resource
    const currentResourceInMarket = await getResourceById(key);

    //! TODO: Perform validation and price/amount match

    if (!currentResourceInMarket) return "Resource not found";
    if (currentResourceInMarket.amount < value.quantity)
      return "Not enough inventory";
    //! Check if this works!
    if (currentResourceInMarket.amount !== value.currentQuantityInMarketplace)
      return "Marketplace inventory mismatch";

    //? Perform Price validation
    const user = await getUserById(userId);
    const newCredits = user.credits - totalPrice;

    //Update user credits if user has enough credits
    if (newCredits >= 0) {
      await updateUserCredits(userId, newCredits);
    } else {
      return "Not enough credits";
    }

    //! Update market price?

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
      await createResourceInMarketOrShipCargoBay({
        name: value.resourceName,
        amount: value.quantity,
        baseValue: value.individualPrice,
        shipCargoBayId: shipCargoBayId,
      });
    }
    //Update resource in cargo if it exists
    else {
      const newAmount = existingResourceInCargo.amount + value.quantity;
      await updateResourceAmountById(existingResourceInCargo.id, newAmount);
    }

    //Reduce in market
    const newAmount = currentResourceInMarket.amount - value.quantity;
    await updateResourceAmountById(key, newAmount);
  }

  //get updated market data and return it
  const newMarketData = await getMarketDataById(marketId);
  return newMarketData;
};

export const sellResourceSelection = async (
  data: object,
  marketId: string,
  userId: string,
  totalPrice: number
) => {
  //Cycle through the resources to be updated
  for (const [key, value] of Object.entries(data)) {
    //Find current resource
    const currentResourceInShipCargo = await getResourceById(key);

    //! TODO: Perform validation and price/amount match
    if (!currentResourceInShipCargo) return "Resource not found";
    if (currentResourceInShipCargo.amount < value.quantity)
      return "Not enough inventory";

    //? Perform Price validation on market
    //!Maybe update market credits
    //Update user credits
    const user = await getUserById(userId);
    const newUserCredits = user.credits + totalPrice;
    await updateUserCredits(userId, newUserCredits);

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

    const newMarketAmount = existingResourceInMarket.amount + value.quantity;
    await updateResourceAmountById(
      existingResourceInMarket.id,
      newMarketAmount
    );

    //Reduce in ship cargo
    const newCargoAmount = currentResourceInShipCargo.amount - value.quantity;
    await updateResourceAmountById(key, newCargoAmount);
  }

  //get updated market data and return it
  const newMarketData = await getMarketDataById(marketId);
  return newMarketData;
};
