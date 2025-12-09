import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/connect";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
// export async function GET(req: NextRequest) {

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || undefined;

    const response = await db.book.findFirst({
      where: { id }
    });
// console.log("response mil rahi book:", response);

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (err) {
    console.log("something wrong", err);
    return NextResponse.json({ success: false });
  }
}

