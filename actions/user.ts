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
            shipCargoBay: {
              include: {
                resources: true,
              },
            },
          },
        },
      },
    });
    return user;
  } catch (error: any) {
    return error.message;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        ship: {
          include: {
            shipEngine: true,
            shipCargoBay: {
              include: {
                resources: true,
              },
            },
          },
        },
      },
    });
    return user;
  } catch (error: any) {
    return error.message;
  }
};

export const getUserByIdOrEmail = async ({
  userId,
  email,
}: {
  userId?: string;
  email?: string;
}) => {
  try {
    if (userId) {
      return getUserById(userId);
    } else if (email) {
      return getUserByEmail(email);
    } else {
      throw new Error("Either userId or email must be provided");
    }
  } catch (error: any) {
    return error.message;
  }
};

export const updateUserCredits = async (userId: string, newCredits: number) => {
  try {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        credits: newCredits,
      },
    });
    return user;
  } catch (error: any) {
    return { error: error.message };
  }
};
