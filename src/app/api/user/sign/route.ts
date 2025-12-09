import { NextResponse } from "next/server";
import { db } from "../../../../../db/connect";
import { Nixie_One } from "next/font/google";
import { error } from "console";

export async function POST(req: Request) {
    const data = await req.json();
    try {
        if (data) {
            const existUser = await db.user.findFirst({
                where: {
                    email: data.email,
                },
            });

            if (existUser) {
                return NextResponse.json({
                    success: true,
                    message: "User Already Exist",
                    error: "User with this Email already Exists",
                });
            } else {

                const response = await db.user.create({
                    data: {
                        name: data.name,
                        email: data.email,
                        mobile: "124565421234",
                        address:data.address,
                        password: data.password
                    }
                });
            }

            return NextResponse.json({
                success: true,
                message: "User Register Successfully",
            })
        }
    }
    catch (error) {
        console.log("Something Wrong");
        return NextResponse.json({
            success: false,
            message: "Something Wnknrong",
            data: error
        });
    };
};

export async function GET() {
    try {
        const users = await db.user.findMany();
        return NextResponse.json({
            success: true,
            data: users,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to fetch users",
            error: error,
        });
    }
}
