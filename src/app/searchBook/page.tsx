"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [detail, setDetail] = useState<[]>([]);
    const [loading, setLoading] = useState(true);

    // DATA GET 
    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/allbooks`);
            const books = res.data.data || [];
            console.log(books)


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

    return (
        <div className='w-full'>
            <div className='py-5 px-6'>
                <div className='flex flex-row justify-between w-300 items-center'>
                    <div className='font-ysabeau text-[25px] font-semibold'>
                        <h1>SEARCH</h1>
                    </div>
                    <form className=' border-2 border-red-500 w-140 p-2 rounded-xl flex justify-between items-center'>
                        <input type="text" placeholder='Enter Book Name' className='border-none outline-none' />
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </form>
                    <div className=''>
                        <a href="./" className='h-10'>
                            <i className="fa-solid fa-house"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100'>
                <div className='border-t border-gray-400 w-full grid grid-cols-4 gap-5 p-6'>
                    {
                        detail.map((i: any) => (
                            <div key={i.id}
                                className='w-46 h-65 flex m-2 rounded-xl shadow-[1px_2px_5px_gray] items-center'>
                                <div className="flex">
                                    <a href={`/infoBook?id=${i.id}`} className="flex flex-col items-center">
                                        <div className="border-1 w-35 h-30 flex justify-center items-center">

                                            {i.image_link ? (
                                                <img src={i.image_link} alt={i.image} className="h-full object-contain" />
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
                                        <div>
                                            {!isCart ? (<button
                                                className='cart'
                                                onClick={() => addToCart(currBook.id)}>
                                                ADD TO CART
                                            </button>) : (<button
                                                className='cart'
                                                onClick={() => removeFromCart(currBook.id)}
                                            >
                                                REMOVE
                                            </button>)}

                                        </div>
                                    </a>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default page
