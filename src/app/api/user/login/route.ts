import { error } from "console";
import { db } from "../../../../../db/connect";
import { NextRequest, NextResponse } from "next/server";
import { run } from "node:test";

export async function POST(req: Request) {
    const data = await req.json();

    try {
        if (data) {
            const existUser = await db.user.findFirst({
                where: {
                    email: data.email,
                }
            });

            if (!existUser) {
                return NextResponse.json({
                    success: true,
                    message: "Invalid User",
                    error: "Invalid User",
                });
            }
            
            if (existUser.password !== data.password) {
                return NextResponse.json({
                    success: true,
                    message: "Invalid Password",
                    error: "Invalid Password",
                });
            }

            if (existUser) {
                return NextResponse.json({
                    success: true,
                    message: "User Login Successfully",
                    error: error,
                    data:existUser
                });
            }
        }
    }
    catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something wrong"
        });
    }
}


