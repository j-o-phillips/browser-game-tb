import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

async function getSession() {
  return await getServerSession(authOptions);
}

export async function GET(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "An error occured" });
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ message: "No current user" });
    }

    return NextResponse.json(currentUser);
  } catch (error: any) {
    return NextResponse.json({ message: "An error occured" });
  }
}
