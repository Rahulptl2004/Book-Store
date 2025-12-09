import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/connect";

export async function GET(req: NextRequest) {
    try {
        const userId = req.cookies.get("userId")?.value;

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "please login first",
            });
        }
        const cartRows = await db.cart.findMany({
            where: { userId },
        });

        const withBook = await Promise.all(
            cartRows.map(async (item) => {
                const book = await db.book.findUnique({
                    where: { id: item.bookId },
                });

                return {
                    ...item,
                    book: book || {},
                };
            })
        );

        return NextResponse.json({
            success: true,
            data: withBook,
        });
    } catch (err) {
        console.log("GET CART ERROR:", err);
        return NextResponse.json(
            { success: false, error: String(err) },
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest) {
    // const data = await req.json(); // updated data which is passed from frontend in data form
    const url = new URL(req.url);
    const cartId = url.searchParams.get("cartId") as string;  // cartId
    const saveLaters = (url.searchParams.get("savelater") as string) == "true" ? true : false;  // saveLater
    const userId = req.cookies.get("userId")?.value;
    try {
        const updateUser = await db.cart.update({
            where: { id: cartId },

            data: {
                saveLater: !saveLaters
            },
        })
        return NextResponse.json({
            success: true,
            data: updateUser,
            message: "save Later update succefully"
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "Something wrong",
            err,
        })
    }
}