"use server";

import { db } from "@/lib/db";

//! CRUD
export const getAllFactories = async () => {
  try {
    const factories = await db.factory.findMany({
      include: {
        resourcesInStock: true,
        productionLines: true,
      },
    });
    return factories;
  } catch (error: any) {
    return error.message;
  }
};

export const getFactoryById = async (id: string) => {
  try {
    const factory = await db.factory.findUnique({
      where: { id },
      include: {
        resourcesInStock: true,
        productionLines: true,
      },
    });
    return factory;
  } catch (error: any) {
    return error.message;
  }
};

export type CreateFactoryData = {
  userId: string;
  marketId: string;
};

export const createFactory = async (data: CreateFactoryData) => {
  try {
    const factory = await db.factory.create({
      data,
    });
    return factory;
  } catch (error: any) {
    return error.message;
  }
};

export const deleteFactoryById = async (id: string) => {
  try {
    await db.factory.delete({
      where: { id },
    });
    return { success: "Factory deleted!" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const addFactoryProductionLine = async (
  factoryId: string,
  newLine: string
) => {
  try {
    await db.productionLine.create({
      data: {
        name: newLine,
        factoryId,
      },
    });

    const factory = await getFactoryById(factoryId);
    return factory;
  } catch (error: any) {
    return error.message;
  }
};
//!COMPOSITE

// export const updateMarketResourceByAmount = async (
//   marketId: string,
//   resource: CreateResourceData
// ) => {
//   try {
//     //check if resource exists on market
//     const existingResources = await getResourcesByShipCargoBayOrMarketId({
//       marketId: marketId,
//     });
//     const resourceExists = existingResources.find(
//       (r: Resource) => r.name === resource.name
//     );

//     //If resource exists on market, update amount
//     if (resourceExists) {
//       await updateResourceAmountById(resourceExists.id, resource.amount);
//     }

//     //If resource does not exist on market, create new resource
//     else {
//       await createResourceInMarketOrShipCargoBay(resource);
//     }
//     return { success: "Resource updated!" };
//   } catch (error: any) {
//     return { error: error.message };
//   }
// };

// export const updateMarketCronResourceByAmount = async (
//   marketId: string,
//   resource: CreateResourceData
// ) => {
//   try {
//     //check if cron resource exists on market
//     const existingResources = await db.cronresource.findMany({
//       where: { marketId: marketId },
//     });

//     const resourceExists = existingResources.find(
//       (r: Cronresource) => r.name === resource.name
//     );

//     //If resource exists on market, update amount
//     if (resourceExists) {
//       await db.cronresource.update({
//         where: { id: resourceExists.id },
//         data: {
//           amount: resource.amount,
//         },
//       });
//     }

//     //If resource does not exist on market, create new resource
//     else {
//       await db.cronresource.create({
//         data: {
//           ...resource,
//           marketId: marketId,
//         },
//       });
//     }
//     return { success: "Cron Resource updated!" };
//   } catch (error: any) {
//     return { error: error.message };
//   }
// };
