import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userEmail: string } }
) {
  try {
    const email = params.userEmail;

    const currentUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ message: "No current user" });
    }

    return NextResponse.json(currentUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
