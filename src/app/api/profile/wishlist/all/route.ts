import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/connect";
export async function GET(req: NextRequest) {
    try {
        const userId = req.cookies.get("userId")?.value;

        if (!userId) {
            return NextResponse.json({ success: false, message: "Login first" });
        }

        const wishlistRows = await db.wishlist.findMany({
            where: { userId },

        });
// console.log("WISHLIST ROWS:", wishlistRows);
        const books = await Promise.all(
            wishlistRows.map(async (item) => {
                const book = await db.book.findUnique({
                    where: { id: item.bookId },
                });
                // console.log("BOOK FETCHED:", book);
                return {
          ...book,
          wishlistId: item.id,   
        };
            })
        );

        return NextResponse.json({
            success: true,
            data: books.filter(Boolean),
        });


    } catch (err) {
        console.log(err);
        return NextResponse.json({ success: false, message: "Server Error" });
    }
}
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("wishListId");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "wishlistId not provided"
      });
    }

    const deleted = await db.wishlist.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      data: deleted,
      message: "Delete success"
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Deletion failed",
      err,
    });
  }
}
