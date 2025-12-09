import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db/connect";

export async function POST(req: NextRequest) {
    const data = await req.json();

    try {
        const newBook = await db.book.create({
            data: {
                title: data.title,
                language: data.language,
                pages: String(data.pages),
                category: data.category,
                about: data.about,
                author: data.author,
                image_link: data.image_link,
                publish: String(data.publish),
                price: String(data.price),
                discount: String(data.discount),
                rating: String(data.rating || 0)
            },
        });

        return NextResponse.json({
            success: true,
            message: "Book saved successfully",
            data: newBook,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const userId = req.cookies.get("userId")?.value;

        // if (!userId) {
        //     return NextResponse.json({
        //         success: false,
        //         message: "please login first",
        //         userId
        //     });
        // }

        const response = await db.book.findMany({    where: { isDeleted: false }
});

        return NextResponse.json({
            success: true,
            data: response,
            message: "get User succefully",
            userId
        });

    } catch (err) {
        console.log("something wrong");

        return NextResponse.json(             // ← ONLY FIX NEEDED
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}


export async function PUT(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Book ID is required" },
                { status: 400 }
            );
        }

        const body = await req.json();

        const updatedBook = await db.book.update({
            where: { id },
            data: {
                title: body.title,
                language: body.language,
                pages: String(body.pages),
                category: body.category,
                about: body.about,
                author: body.author,
                image_link: body.image_link,
                publish: String(body.publish),
                price: String(body.price),
                discount: String(body.discount),
                rating: String(body.rating),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Update failed" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Book ID is required" },
                { status: 400 }
            );
        }

        // await db.book.delete({
        //     where: { id },
        // });
        await db.book.update({
            where: { id },
            data: { isDeleted: true },
        });

        return NextResponse.json({
            success: true,
            message: "Book deleted successfully",
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Delete failed" },
            { status: 500 }
        );
    }
}