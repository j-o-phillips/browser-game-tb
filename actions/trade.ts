"use server";

import { db } from "@/lib/db";
import { getMarketDataById } from "./market";
import { MarketData } from "@/types";
import {
  createOrUpdateResourceInmarketOrShipCargoBay,
  createResourceInMarketOrShipCargoBay,
  getResourceById,
  getResourcesByShipCargoBayOrMarketId,
  updateResourceAmountById,
} from "./resource";
import { getUserById, updateUserCredits } from "./user";
import { getShipById, updateShipFuelByid } from "./ship";
import {
  getCronResourceById,
  updateCronResourceAmountById,
} from "./cronResource";
import { getShipCargoBayById } from "./shipCargoBay";
import { Resource, ShipCargoBay, ShipEngineSaleTemplate } from "@prisma/client";
import { updateShipEngineById } from "./shipEngine";
export const buyResourceSelection = async (
  data: object,
  marketId: string,
  shipCargoBayId: string,
  userId: string,
  totalPrice: number
) => {
  //Find user
  const user = await getUserById(userId);

  //Find cargo bay
  const shipCargoBay: ShipCargoBay & { resources: Resource[] } =
    await getShipCargoBayById(shipCargoBayId);
  if (!shipCargoBay) return "Ship cargo bay not found";

  //? Perform Price validation
  const newCredits = user.credits - totalPrice;

  //Update user credits if user has enough credits
  if (newCredits >= 0) {
    await updateUserCredits(userId, newCredits);
  } else {
    return "Not enough credits";
  }

  //! Update market price?

  //Cycle through the resources to be updated
  for (const [key, value] of Object.entries(data)) {
    //Find current resource
    let currentResourceInMarket;
    if (
      value.resourceName === "Food" ||
      value.resourceName === "Oxygen" ||
      value.resourceName === "Fuel"
    ) {
      currentResourceInMarket = await getCronResourceById(key);
    } else {
      currentResourceInMarket = await getResourceById(key);
    }

    //! TODO: Perform validation and price/amount match

    if (!currentResourceInMarket) return "Resource not found";
    if (currentResourceInMarket.amount < value.quantity)
      return "Not enough inventory";
    //! Check if this works!
    if (currentResourceInMarket.amount !== value.currentQuantityInMarketplace)
      return "Marketplace inventory mismatch";

    //? Add resources to ship cargo
    await createOrUpdateResourceInmarketOrShipCargoBay(
      {
        name: value.resourceName,
        amount: value.quantity,
        baseValue: value.individualPrice,
        marketId: marketId,
        shipCargoBayId: shipCargoBayId,
      },
      shipCargoBay
    );

    //Reduce in market
    const newAmount = currentResourceInMarket.amount - value.quantity;
    if (
      value.resourceName === "Food" ||
      value.resourceName === "Oxygen" ||
      value.resourceName === "Fuel"
    ) {
      await updateCronResourceAmountById(key, newAmount);
    } else {
      await updateResourceAmountById(key, newAmount);
    }
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
  //? Perform Price validation on market
  //!Maybe update market credits
  //Update user credits
  const user = await getUserById(userId);
  const newUserCredits = user.credits + totalPrice;
  await updateUserCredits(userId, newUserCredits);

  //Find market resources
  const market: MarketData = await getMarketDataById(marketId);

  if (!market) return "Market name not found";
  // Resource should always exist in market

  //Cycle through the resources to be updated
  for (const [key, value] of Object.entries(data)) {
    //Find current resource
    const currentResourceInShipCargo = await getResourceById(key);

    //! TODO: Perform validation and price/amount match
    if (!currentResourceInShipCargo) return "Resource not found";
    if (currentResourceInShipCargo.amount < value.quantity)
      return "Not enough inventory";

    //? Add resources to market Inventory

    let existingResourceInMarket;
    //!If Cron Resource
    if (
      value.resourceName === "Food" ||
      value.resourceName === "Oxygen" ||
      value.resourceName === "Fuel"
    ) {
      existingResourceInMarket = market.cronResources.find(
        (resource) => resource.name === value.resourceName
      );
    } //! If normal resource
    else {
      existingResourceInMarket = market.resources.find(
        (resource) => resource.name === value.resourceName
      );
    }

    //Update resource in cargo if it exists
    if (!existingResourceInMarket) return "Resource not found in market";

    const newMarketAmount = existingResourceInMarket.amount + value.quantity;

    //!If Cron Resource
    if (
      value.resourceName === "Food" ||
      value.resourceName === "Oxygen" ||
      value.resourceName === "Fuel"
    ) {
      await updateCronResourceAmountById(
        existingResourceInMarket.id,
        newMarketAmount
      );
    } //! If normal resource
    else {
      await updateResourceAmountById(
        existingResourceInMarket.id,
        newMarketAmount
      );
    }

    //Reduce in ship cargo
    const newCargoAmount = currentResourceInShipCargo.amount - value.quantity;
    await updateResourceAmountById(key, newCargoAmount);
  }

  //get updated market data and return it
  const newMarketData = await getMarketDataById(marketId);
  return newMarketData;
};

export const transferFuelFromCargoToShip = async (
  fuelData: { fuelAmount: number; resourceId: string },
  shipId: string,

  userId: string
) => {
  try {
    //Validations
    if (!fuelData || !shipId || !userId) return "Invalid data";
    const currentInCargo = await getResourceById(fuelData.resourceId);
    const newAmount = currentInCargo.amount - fuelData.fuelAmount;

    //Reduce in ship cargo
    if (newAmount < 0) return "Not enough fuel in cargo";
    await updateResourceAmountById(fuelData.resourceId, newAmount);

    //Increase in ship
    const currentShip = await getShipById(shipId);
    //!Not sure why this error is here
    // @ts-ignore
    const newShipFuel = currentShip?.fuel + fuelData.fuelAmount;
    await updateShipFuelByid(shipId, newShipFuel);

    const user = await getUserById(userId);
    return user;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const buyShipEngine = async (
  userId: string,
  userCredits: number,
  engineId: string,
  engineData: ShipEngineSaleTemplate
) => {
  try {
    //Validations
    if (!userId || !engineId || !engineData) return "Invalid data";

    //Check if user has enough credits
    if (userCredits < engineData.price) return "Not enough credits";

    //Reduce user credits
    const newCredits = userCredits - engineData.price;
    await updateUserCredits(userId, newCredits);

    //Update in DB
    const shipEngine = await updateShipEngineById(engineId, engineData);
    const user = await getUserById(userId);

    return user;
  } catch (error: any) {
    return { error: error.message };
  }
};
