"use server";

import { db } from "@/lib/db";

export default async function updateUserLoc(
  userId: string,
  loc: string,
  pos: number[]
) {
  try {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        currentLoc: loc,
        currentPos: pos,
      },
    });

    return user;
  } catch (error: any) {
    return error.message;
  }
}
