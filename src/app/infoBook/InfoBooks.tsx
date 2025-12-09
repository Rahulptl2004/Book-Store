"use client";
import Book from '@/src/Component/BookStore/Book';
import '../../Component/style/infoBook.css'
import React, { useEffect, useState } from 'react'
import SimilarBook from '@/src/Component/SimilarBook/SimilarBook';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const InfoBooks = () => {
    const [currBook, setShowDetail] = useState<any>({});
    const [isCart, setIsCart] = useState(false)
    const [isWishlist, setIsWishlist] = useState(false)
    const [loading, setLoading] = useState(true);

    // console.log("Current Book:", currBook);
    const searchParams = useSearchParams();
    const bookId = searchParams.get("id");
    // console.log("URL se mili ID (key):", key);
    const Wishlist = async (bookId: string) => {
        try {
            const res = await axios.post(`/api/profile/wishlist/wish`, { bookId });

            if (res.data.action === "added") {
                setIsWishlist(true);
            } else {
                setIsWishlist(false);
            }
        } catch (err) {
            console.log(err);
        }

        // getData()
    };
    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/profile/infobook?id=${bookId}`);
            const book = res.data.data;
            setShowDetail(book);

            // GET ALL WISHLIST ITEMS
            const wishlistRes = await axios.get(`/api/profile/wishlist/all`);
            const wishlistBooks = wishlistRes.data.data;

            // CHECK IF CURRENT BOOK EXISTS
            setIsWishlist(wishlistBooks.some((b: any) => b.id === book.id));

            // CART CHECK
            const cart = await axios.get(`/api/cart/check?bookId=${book.id}`);
            setIsCart(cart.data.inCart);

        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false)
        }
    };
    const addToCart = async (bookId: string) => {
        try {
            const res = await axios.post(`/api/cart/add`, { bookId });

            if (res.data.success) {
                setIsCart(true);
            }
        } catch (err) {
            console.log(err);
        }
    };


    const removeFromCart = async (bookId: string) => {
        try {
            const res = await axios.post(`/api/cart/remove`, { bookId });

            if (res.data.success) {
                setIsCart(false);
            }
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        if (bookId) {
            getData();
        }
    }, [bookId]);
    if (loading) {
        return (
            <main className="flex items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </main>
        );
    }
    return (
        <div className='book-details'>
            <div className='infobook'>
                <div className='book-img'>
                    <img src={currBook.image_link} alt="" />
                    <i className={isWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                        style={{ color: isWishlist ? "red" : "inherit" }}
                        onClick={() => Wishlist(currBook.id)}>
                    </i>
                </div>
                <div className='detail-box'>
                    <div className='content'>
                        <h1>{currBook.title}</h1>
                        <p>{currBook.about}</p>
                        <div className='price'>
                            <span className='curr-price'>₹{currBook.price - (currBook.price * currBook.discount / 100)}</span>
                            <span className='total-price'>₹{currBook.price}</span>
                            <span className='discount'>({currBook.discount}%OFF)</span>
                        </div>
                        <p><span>you save <b>₹{currBook.price - (currBook.price - (currBook.price * currBook.discount / 100))}</b></span></p>
                        <div className='logo-img'>
                            <img src="secure.svg" alt="" />
                            <img src="genuine.svg" alt="" />
                            <img src="cod.svg" alt="" />
                        </div>
                    </div>
                    <div className='two-btns'>
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


                        <button className='buy'>BUY NOW</button>
                    </div>
                </div>
            </div>
            <div className='rat-spe'>
                <div className='rating'>
                    <h2 className='rr'>Ratings & Reviews</h2>
                    <div className='rat-review'>
                        <div className='rat-box'>
                            <div className='review'>
                                4.5
                                <i className="fa-solid fa-star" style={{ fontSize: "20px", margin: "5px" }}></i>
                            </div>
                            <div className='review2'>
                                400 Ratings &
                                0 Reviews
                            </div>
                        </div>
                        <div className='review-box'>
                            <div className='rebox'>
                                <ul>
                                    <li>5 <i className="fa-solid fa-star" style={{ fontSize: "15px", margin: "5px" }}></i><span className='line'></span></li>
                                    <li>4<i className="fa-solid fa-star" style={{ fontSize: "15px", margin: "5px" }}></i><span className='line'></span></li>
                                    <li>3 <i className="fa-solid fa-star" style={{ fontSize: "15px", margin: "5px" }}></i><span className='line'></span></li>
                                    <li>2 <i className="fa-solid fa-star" style={{ fontSize: "15px", margin: "5px" }}></i><span className='line'></span></li>
                                    <li>1 <i className="fa-solid fa-star" style={{ fontSize: "15px", margin: "5px" }}></i><span className='line'></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='spe'>
                    <table className='table'>
                        <thead>
                            <tr><th>Specifications</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>title</td><td>{currBook.title}</td>
                            </tr>
                            <tr>
                                <td>Auther</td><td>{currBook.author}</td>
                            </tr>
                            <tr>
                                <td>Language</td><td>{currBook.language}</td>
                            </tr>
                            <tr>
                                <td>Pages</td><td>{currBook.pages}</td>
                            </tr>
                            <tr>
                                <td>Category</td><td>{currBook.category}</td>
                            </tr>
                            <tr>
                                <td>Published Date</td><td>{currBook.published_year}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='similar-book'>
                <h1 className='similar-head'>Similar products</h1>
                <SimilarBook Category={currBook?.category} />
            </div>
        </div>
    )
}

export default InfoBooks
