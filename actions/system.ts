"use server";

import { db } from "@/lib/db";

export type SystemData = {
  name: string;
};

export const getAllSystems = async () => {
  try {
    const systems = await db.system.findMany();
    return systems;
  } catch (error: any) {
    return error.message;
  }
};

export const addSystem = async (incomingData: SystemData) => {
  const { name } = incomingData;

  try {
    await db.system.create({
      data: {
        name: name,
      },
    });
    return { success: "System created!" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteSystemById = async (id: string) => {
  console.log(id);
  try {
    await db.system.delete({
      where: { id },
    });
    return { success: "System deleted!" };
  } catch (error: any) {
    return { error: error.message };
  }
};
