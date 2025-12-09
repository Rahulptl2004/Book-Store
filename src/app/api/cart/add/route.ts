import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/connect";

export async function POST(req: NextRequest) {
  try {
    const { bookId } = await req.json();
    const userId = req.cookies.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ success: false, message: "Login first" });
    }


    const existing = await db.cart.findFirst({
      where: { userId, bookId }
    });

    if (existing) {

      await db.cart.update({
        where: { id: existing.id },
        data: { qty: existing.qty + 1 }
      });

      return NextResponse.json({
        success: true,
        message: "Quantity Updated"
      });
    }

    await db.cart.create({
      data: {
        userId,
        bookId,
        qty: 1,
        saveLater: false
      }
    });

    return NextResponse.json({
      success: true,
      message: "Added to cart",

      // inCart:true
    });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: "Server Error" });
  }
}
