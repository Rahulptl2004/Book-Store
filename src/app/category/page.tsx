"use client";

import Book from "@/src/component/BookStore/Book";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Book = {
    category: string;
    id: string;
    title: string;
    price: number;
    author: string;
    image_link: string;
    // add more fields if needed (title, id, image, etc.)
};

const Page = () => {
    const [allBook, setAllBook] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [curCatgry, setCurCatgry] = useState("All");
    const [detail, setDetail] = useState<Book[]>([]);

    const showBook = (cat: string) => {
        setCurCatgry(cat);

        if (cat === "All") {
            setDetail(allBook);
        } else {
            const filtered = allBook.filter((b) => b.category === cat);
            setDetail(filtered);
        }
    };

    // DATA GET 
    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/allbooks?Category=${curCatgry}`);
            const books = res.data.data || [];
            console.log(books)
            setAllBook(books);

            setDetail(books);
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);

        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return (
            <main className="flex items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </main>
        );
    }

    const categories = ["All", ...new Set(allBook.map((book) => book.category))];

    return (
        <div className="h-auto w-ful">
            <div className="flex">
                <div className="border-x w-1/3 h-full px-7 " >
                    <div className="flex justify-between py-4">
                        <h1 className="text-2xl font-bold">Filter</h1>
                        <button className="text-l text-red-400 cursor-pointer underline">Clear All</button>
                    </div>
                    <div>
                        <h1 className="border-t border-gray-400 text-xl font-bold py-3">Category</h1>
                        <div>
                            {
                                categories.map((cate) => (
                                    <ul key={cate}>
                                        <li className="list-none font-w font-semibold text-gray-700 mx-7 py-[2px]">
                                            <button onClick={() => showBook(cate)} className="cursor-pointer">
                                                {cate}
                                            </button>
                                        </li></ul>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="w-2/3">
                    <h2 className="text-2xl font-bold py-4 px-2">{curCatgry}</h2>
                    <div className='border-t border-gray-400 w-full grid grid-cols-4 gap-5 p-6'>
                        {
                            detail.map((i: any) => (
                                <div key={i.id}
                                    className='w-46 h-65 flex m-2 rounded-xl shadow-[1px_2px_5px_gray] items-center'>
                                    <div className="flex">
                                        <a href={`/infoBook?id=${i.id}`} className="flex flex-col items-center">
                                            <div className="border-1 w-35 h-30 flex justify-center items-center">

                                                {i.image_link ? (
                                                    <img src={i.image_link} alt={i.image} className="h-full object-contain"/>
                                                ) : (
                                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                            <div className='mt-2 mx-3'>
                                                <h1 className='font-semibold text-sm mt-3 '>{i.title}</h1>
                                                <div className='text-sm mt-1'>
                                                    <span className='font-bold text-600'>
                                                        ₹{i.price - (i.price * i.discount / 100)}
                                                    </span>
                                                    <span className='line-through text-gray-500 ml-2'>₹{i.price}</span>
                                                    <span className='text-green-600 ml-2 font-semibold'>
                                                        ({i.discount}% OFF)
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Page;
