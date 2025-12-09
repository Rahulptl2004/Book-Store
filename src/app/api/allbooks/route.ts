import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db/connect";
import { useSearchParams } from "next/navigation";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("Category")||undefined;

    const response = await db.book.findMany({
    //   where: { category:category }
    });

    return NextResponse.json({
      success: true,
      data: response,
    });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false });
  }
}
