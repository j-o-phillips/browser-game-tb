import { db } from "@/lib/db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await db.user.update({
      where: {
        id: "6602c44cd192096d0ddcf491",
      },
      data: {
        credits: 200,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
