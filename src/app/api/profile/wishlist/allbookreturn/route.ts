import { db } from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.cookies.get("userId")?.value;

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Login first",
                data: []
            });
        }

        const items = await db.wishlist.findMany({
            where: { userId },
            select: { bookId: true }
        });

        return NextResponse.json({
            success: true,
            data: items.map((item) => item.bookId)
        });

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Server error",
            data: []
        });
    }
}
