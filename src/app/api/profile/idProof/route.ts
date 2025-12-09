import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/connect";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const newDocument = await db.idProof.create({
      data: {
        documentName: data.idNum,
        userId: data.userId,
        documentType: data.idProof,
        name: data.name
      },
    },)


    return NextResponse.json({
      success: true,
      message: " add successfully",
      data: newDocument,
    });
  }

  catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something wrong",
      err,
    })
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.cookies.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "please login first",
      });
    }

    const response = await db.idProof.findFirst({
      where: { userId: userId },
    });

    return NextResponse.json({
      success: true,
      data: response,
      message: " document get succefully"
    });
  } catch (err) {
    console.log("something wrong");
  }
}
