"use server";

import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        ship: {
          include: {
            shipEngine: true,
          },
        },
      },
    });
    return user;
  } catch (error: any) {
    return error.message;
  }
};
