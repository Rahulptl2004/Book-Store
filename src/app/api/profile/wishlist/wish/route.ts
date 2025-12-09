import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/connect";

export async function POST(req: NextRequest) {
  try {
    const { bookId } = await req.json();
    const userId = req.cookies.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Login first",
      });
    }

    const exists = await db.wishlist.findFirst({
      where: { userId, bookId },
    });

   
    if (exists) {
      await db.wishlist.delete({
        where: { id: exists.id },
      });

      return NextResponse.json({
        success: true,
        action: "removed",
        message: "Removed from wishlist",
      });
    }

   
    await db.wishlist.create({
      data: { userId, bookId },
    });

    return NextResponse.json({
      success: true,
      action: "added",
      message: "Added to wishlist",
    });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: "Server Error" });
  }
}


export async function GET(req: NextRequest) {
  const userId = req.cookies.get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ success: false, message: "Login first" });
  }

  const url = new URL(req.url);
  const bookId = url.searchParams.get("bookId");

  if (!bookId) {
    return NextResponse.json({ success: false, message: "Book ID missing" });
  }

  const wishlist = await db.wishlist.findFirst({
    where: { userId, bookId },
  });

  return NextResponse.json({
    success: true,
    inWishlist: Boolean(wishlist),
  });
}
