"use server";

import { db } from "@/lib/db";

export const addPlanet = async () => {
  await db.market.create({
    data: {
      name: "Test",
      resources: 10000,
    },
  });

  return { success: "Planet created!" };
};
