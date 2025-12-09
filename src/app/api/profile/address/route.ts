import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/connect";


export async function POST(req: NextRequest) {
       const data = await req.json();
       try {
              const userId = req.cookies.get("userId")?.value;
              if (!userId) {
                     return NextResponse.json({ success: false, message: "Please login first" }, { status: 401 });
              }

              const newAddress = await db.addressID.create({
                     data: {
                            name: data.name,
                            mobile: data.mobile,
                            pinCode: data.pinCode,
                            locality: data.locality,
                            house: data.house,
                            city: data.city,
                            state: data.state,
                            landmark: data.landmark,
                            altMobile: data.altMobile,
                            userId: userId

                     },
              });

              return NextResponse.json({
                     success: true,
                     message: "Address saved successfully",
                     data: newAddress,
              });

       } catch (error) {
              console.error(error);
              return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
       }
}

export async function GET(req: NextRequest) {
       try {
              const userId = req.cookies.get("userId")?.value;

              if (!userId) {
                     return NextResponse.json({
                            success: false,
                            message: "please login first",
                            userId
                     });
              }

              const response = await db.addressID.findMany({
                     where: { userId: userId },
              });

              return NextResponse.json({
                     success: true,
                     data: response,
                     message: "get User succefully", userId
              });
       } catch (err) {
              console.log("something wrong");
       }
}

export async function DELETE(req: NextRequest) {
       try {
              const { searchParams } = new URL(req.url);
              const addressID = searchParams.get("addressID");
              if (!addressID) {
                     return NextResponse.json({
                            success: false,
                            message: "Address missing"
                     });
              }
              await db.addressID.delete({
                     where: {
                            id: addressID
                     }
              })
              return NextResponse.json({
                     success: true,
                     message: "Address deleted successfully",
              });

       } catch (err) {
              return NextResponse.json(
                     {
                            success: false,
                            message: "Error deleting address"
                     }
              )
       }
}

export async function PUT(req: NextRequest) {

} 