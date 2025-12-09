import { NextResponse } from "next/server";
import { db } from "../../../../../db/connect";

export async function PUT(req: Request) {
    const data = await req.json();
    try {
        const updatedUser = await db.user.update({
            where: {
                email: data.email,
            },
            data: {
                name: data.name,
                mobile: data.mobile,
                password: data.password,
            },
        });
        return NextResponse.json({
            success: true,
            message: "User Update Successfully",
            data: updatedUser,
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "ser not found or update failed",
            err,
        });
    }
}


export async function DELETE(req: Request) {
    const data = await req.json();
    try {
        const updatedUser = await db.user.delete({
            where: {
                email: data.email,
            },

        })
        return NextResponse.json({
            success: true,
            message: "User Delete Successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        return NextResponse.json({
            success: false,
            message: "User Not Found",
            err,
        });
    }
}

export async function GET(req: Request) {
    try {
        const updatedUser = await db.user.findMany();
        return NextResponse.json({
            success: true,
            message: "Get User Successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        return NextResponse.json({
            success: false,
            message: "User Not Found",
            err,
        });
    }
}



