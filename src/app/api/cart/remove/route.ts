import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/connect";

export async function POST(req:any) {
  try {
    const { bookId } = await req.json();
    const userId = req.cookies.get("userId")?.value;

    const existing = await db.cart.findFirst({
      where: { userId, bookId }
    });

    if (!existing) {
      return NextResponse.json({ success: false, message: "Item not in cart" });
    }

    await db.cart.delete({
      where: { id: existing.id }
    });

    return NextResponse.json({ success: true, message: "Removed from cart" });

  } catch (err) {
    return NextResponse.json({ success: false });
  }
}
