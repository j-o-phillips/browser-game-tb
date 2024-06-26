"use server";

import { db } from "@/lib/db";
import { getUserById } from "./user";

export default async function updateUserLoc(
  userId: string,
  loc: string,
  pos: number[]
) {
  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        currentLoc: loc,
        currentPos: pos,
      },
    });

    const user = await getUserById(userId);
    return user;
  } catch (error: any) {
    return error.message;
  }
}

//cron
