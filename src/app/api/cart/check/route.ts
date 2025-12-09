import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/connect";

export async function GET(req: NextRequest) {
    try {
        const bookId = req.nextUrl.searchParams.get("bookId");
        const userId = req.cookies.get("userId")?.value; 

        if (!bookId || !userId) {
            return NextResponse.json({ inCart: false });
        }

        const item = await db.cart.findFirst({
            where: {
                bookId,
                userId
            }
        });

        return NextResponse.json({ inCart: !!item });
    } catch (err) {
        return NextResponse.json({ inCart: false });
    }
}
