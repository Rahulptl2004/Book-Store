import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/connect";
import { Actor } from "next/font/google";

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const cartId = url.searchParams.get("cartId") as string;

    await db.cart.delete({
      where: { id: cartId }, // MongoDB = string id
    });

    return NextResponse.json({ success: true, message: "Item removed" });

  } catch (err) {
    console.log("REMOVE ERROR:", err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}

export async function PUT(req: NextRequest) {
    const url = new URL(req.url);
    const cartId = url.searchParams.get("cartId")!;
    const action = url.searchParams.get("action"); // inc or dec

    try {
        const current:any = await db.cart.findUnique({ where: { id: cartId } });

        const newQty = action === "inc"
            ? current.qty + 1
            : current.qty - 1;

        if (newQty <= 0) {
            await db.cart.delete({ where: { id: cartId } });
            return NextResponse.json({
                success: true,
                message: "Item removed",
            });
        }

        const updateUser = await db.cart.update({
            where: { id: cartId },
            data: { qty: newQty },
        });

        return NextResponse.json({
            success: true,
            data: updateUser,
            message: "Quantity updated",
        });
    } catch (err) {
        return NextResponse.json({ success: false, err });
    }
}
