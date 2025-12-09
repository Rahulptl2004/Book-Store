import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/connect";
export async function GET(req: NextRequest) {
    const userId = req.cookies.get("userId")?.value;

    if (!userId) {
        return NextResponse.json({ success: false, message: "Login first" });
    }

    const cart = await db.cart.findMany({
        where: { userId },
        // include: { book: true }
    });

    return NextResponse.json({ success: true, data: cart });
}
