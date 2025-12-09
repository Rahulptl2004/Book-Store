import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/connect";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("Category") || undefined;

    const response = await db.book.findMany({
      where: category ? { category } : undefined,
    });

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
