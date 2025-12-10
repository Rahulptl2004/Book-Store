"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [detail, setDetail] = useState<[]>([]);
    const [loading, setLoading] = useState(true);

    const [cart, setCart] = useState<string[]>([]);
    const [wishlist, setWishlist] = useState<string[]>([]);

 
    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/allbooks`);
            const books = res.data.data || [];
            setDetail(books);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    const toggleWishlist = async (bookId: string) => {
        try {
            const res = await axios.post(`/api/profile/wishlist/wish`, { bookId });

            if (res.data.action === "added") {
                setWishlist(prev => [...prev, bookId]);
            } else {
                setWishlist(prev => prev.filter(id => id !== bookId));
            }

        } catch (err) {
            console.log(err);
        }
    };

    const addToCart = async (bookId: string) => {
        try {
            const res = await axios.post(`/api/cart/add`, { bookId });

            if (res.data.success) {
                setCart(prev => [...prev, bookId]);
            }
        } catch (err) {
            console.log(err);
        }
    };

  
    const removeFromCart = async (bookId: string) => {
        try {
            const res = await axios.post(`/api/cart/remove`, { bookId });

            if (res.data.success) {
                setCart(prev => prev.filter(id => id !== bookId));
            }
        } catch (err) {
            console.log(err);
        }
    };
    const loadUserData = async () => {
    try {
        const wish = await axios.get("/api/profile/wishlist/allbookreturn");
        const cartRes = await axios.get("/api/cart/all");

        if (wish.data.success) setWishlist(wish.data.data);
        if (cartRes.data.success) setCart(cartRes.data.data);

    } catch (err) {
        console.log(err);
    }
};


   useEffect(() => {
    getData();
    loadUserData();
}, []);


    if (loading) {
        return (
            <main className="flex items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </main>
        );
    }

    return (
        <div className='w-full'>

            <div className='py-5 px-6'>
                <div className='flex flex-row justify-between w-300 items-center'>
                    <div className='font-ysabeau text-[25px] font-semibold'>
                        <h1>SEARCH</h1>
                    </div>

                    <form className='border-2 border-red-500 w-140 p-2 rounded-xl flex justify-between items-center'>
                        <input type="text" placeholder='Enter Book Name'
                               className='border-none outline-none' />
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </form>

                    <a href="./" className='h-10'>
                        <i className="fa-solid fa-house"></i>
                    </a>
                </div>
            </div>

            <div className='bg-gray-100'>
                <div className='border-t border-gray-400 w-full grid grid-cols-5'>

                    {detail.map((i: any) => {
                        const isLiked = wishlist.includes(i.id);
                        const isInCart = cart.includes(i.id);

                        return (
                            <div key={i.id}
                                className='flex m-2 h-70 rounded-xl shadow-[1px_2px_5px_gray] justify-center items-center'>

                                <div className="flex flex-col">
                                    
                                    <div className="border-1 w-38 h-30 flex justify-center items-center relative">

                                        {i.image_link ? (
                                            <img src={i.image_link} className="h-full object-contain" />
                                        ) : (
                                            <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                                                No Image
                                            </div>
                                        )}

                                        <div className='absolute top-1 right-1 text-xl cursor-pointer'>
                                            <i
                                                className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                                                style={{ color: isLiked ? "red" : "inherit" }}
                                                onClick={() => toggleWishlist(i.id)}
                                            ></i>
                                        </div>
                                    </div>

                                    <div className='mt-2 mx-3'>
                                        <h1 className='font-semibold text-sm mt-3'>{i.title}</h1>

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

                                    <div className='my-4'>
                                        {!isInCart ? (
                                            <button
                                                className='border-1 border-red-400 w-40 h-7 text-sm rounded-md shadow-[1px_2px_5px_red]'
                                                onClick={() => addToCart(i.id)}
                                            >
                                                ADD TO CART
                                            </button>
                                        ) : (
                                            <button
                                                className='border-1 border-red-400 w-40 h-7 text-sm rounded-md shadow-[1px_2px_5px_red]'
                                                onClick={() => removeFromCart(i.id)}
                                            >
                                                REMOVE
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

        </div>
    );
};

export default Page;
