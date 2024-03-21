"use server";

import { db } from "@/lib/db";

export const addSystem = async (incomingData) => {
  const { name } = incomingData;
  await db.system.create({
    data: {
      name: name,
    },
  });

  return { success: "System created!" };
};
