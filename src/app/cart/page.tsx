"use client";
import React, { useEffect, useState } from 'react'
import '../../component/style/cart.css'
import axios from 'axios';
import { log } from 'console';
// import Book from '@/src/Component/BookStore/Book';

const page = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)

    const priceDetail = async () => {
        setPrice(cartItems.filter((item) => item.saveLater == false)
            .reduce((sum, book) => sum + (book.price * book.qty), 0));
        setDiscount(cartItems.filter((item) => item.saveLater == false)
            .reduce((sum, book) => sum + (book.price * (book.discount / 100) * book.qty), 0))
    }
    const getCart = async () => {
        try {
            const res = await axios.get("/api/cartbook/cartPage");
            // console.log(res)
            setCartItems(
                res.data.data.map((item: any) => ({

                    cartId: item.id,
                    qty: item.qty,
                    saveLater: item.saveLater,
                    ...item.book,
                }))
            );
            ;
            // console.log(res.data.data)

        } catch (err) {
            console.log(err);
        }
    };
    const saveLater = async (cartId: string, saveLater: boolean) => {
        try {
            const respo = await axios.put(
                `/api/cartbook/cartPage?cartId=${cartId}&savelater=${saveLater}`
            );
            getCart();
        } catch (err) {
            console.log(err);
        }
    };
    const removeFromCart = async (cartId: string) => {
        try {
            const res = await axios.delete(`/api/cartbook/removebook?cartId=${cartId}`);

            if (res.data.success) {
                alert("Removed from cart");
                getCart();
            }
        } catch (err) {
            console.log(err);
        }
    };
    const updateQunt = async (cartId: string, action: string) => {
        try {
            await axios.put(`/api/cartbook/removebook?cartId=${cartId}&action=${action}`);
            getCart();
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        priceDetail();
    },[cartItems])
    useEffect(() => {
        getCart();
        // console.log(cartItems)
    }, []);

    return (
        <div className='maincart'>
            <div className='cart'>
                <div className='cartIn'>
                    {cartItems.length > 0 ? (
                        <>
                            <div className='main-head'><h1>Shopping Cart</h1></div>

                            <div className='itemBox'>
                                {cartItems.filter(item => item.saveLater === false).map((item: any) => (
                                    <div className='item' key={item.cartId}>
                                        <div className='image-add'>
                                            <a className='image' href={`/infoBook?id=${item.id}`} >
                                                <img src={item.image_link} alt="image" />
                                            </a>
                                            <div className='add'>
                                                <button onClick={() => updateQunt(item.cartId, "dec")}>-</button>

                                                <div>{item.qty}</div>
                                                <button onClick={() => updateQunt(item.cartId, "inc")}>+</button>

                                            </div>
                                        </div>
                                        <div>
                                            <div className='imageDetail'>
                                                <div className='b-title'><span>{item.title}</span></div>
                                                <div className='lan-auth'><span>{item.author}</span></div>
                                                <div className='b-price'>
                                                    <span className='curr-price'>₹{item.price - (item.price * item.discount / 100)}</span>
                                                    <span className='total-price'>₹{item.price}</span>
                                                    <span className='discount'>({item.discount}%OFF)</span>
                                                </div>
                                            </div>
                                            <span className='stock'>In Stoke</span>
                                            <div className='b-buttons'>
                                                <button className='btn' onClick={() => removeFromCart(item.cartId)}>
                                                    Remove
                                                </button>
                                                {/* <button className='btn'>remove</button> */}

                                                <button className='btn' onClick={() => saveLater(item.cartId, item.saveLater)}>Save for later</button>

                                                <button className='btn'>Buy this now</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div>Cart is Empty</div>
                    )}
                </div>
                <div className='detail-price'>
                    <div className='pp'>
                        <h1>Price Details</h1>
                        <div className='imagePrice'>
                            <div className='price-item'>
                                <span>price</span>
                                <span>₹{price}</span>
                            </div>
                            <div className='dis'>
                                <span>discount</span>
                                <span className='number'>₹{discount}</span>
                            </div>
                            <div className='deliver'>
                                <span>delivary charge</span>
                                <span className='number'>FREE delivery</span>
                            </div>
                        </div>
                        <div className='total'>
                            <span>total</span>
                            <span>{price - discount}</span>
                        </div>
                        <div className='save'>
                            <span>You will save {discount} on this order</span>
                        </div>
                    </div>
                    <div className='place-order'>
                        <button className='order'>Place order</button>
                    </div>
                </div>
            </div>

            <div className='save-latter'>
                <div className='main-head'><h1>Save for latter</h1></div>
                <div className='itemBox'>
                    {cartItems.length > 0 ? (

                        cartItems.filter((item) => (item.saveLater == true)).map((item: any) => (
                            <div className='item' key={item.id}>
                                <div className='image-add'>
                                    <a className='image' href={`/infoBook?id=${item.id}`} >
                                        <img src={item.image_link} alt="image" />
                                    </a>
                                    <div className='add'>
                                        <button onClick={() => updateQunt(item.cartId, "dec")}>-</button>
                                        <div>{item.qty}</div>
                                        <button onClick={() => updateQunt(item.cartId, "inc")}>+</button>
                                    </div>
                                </div>
                                <div className='imagedet'>
                                    <div className='imageDetail'>
                                        <div className='b-title'><span>{item.title}</span></div>
                                        <div className='lan-auth'><span>{item.author}</span></div>
                                        <div className='b-price'>
                                            <span className='curr-price'>₹{item.price - (item.price * item.discount / 100)}</span>
                                            <span className='total-price'>₹{item.price}</span>
                                            <span className='discount'>({item.discount}%OFF)</span>
                                        </div>
                                    </div>
                                    <span className='stock'>In Stoke</span>
                                    <div className='b-buttons'>
                                        <button className='btn' onClick={() => removeFromCart(item.cartId)}>Delete</button>
                                        <button className='btn' onClick={() => saveLater(item.cartId, item.saveLater)}>Add to list</button>
                                    </div>
                                </div>
                            </div>
                        ))

                    ) : (<div>Cart is Empty</div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default page
