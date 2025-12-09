"use client"
import React, { useEffect, useState } from 'react'
import '../style/wishlist.css'
import axios from 'axios';
import { it } from 'node:test';
const Wishlist = () => {

  const [books, setBooks] = useState<any[]>([]);
  const getWishlist = async () => {
    try {
      const res = await axios.get('/api/profile/wishlist/all')

      if (res.data.success) {
        setBooks(res.data.data);
        // console.log(res)
      }
    } catch (err) {
      console.log(err)
    }
  };
 const remove = async (id: string) => {
  try {
    await axios.delete(`/api/profile/wishlist/all?wishListId=${id}`);
    getWishlist();
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    getWishlist();
  }, [])
  return (
    <div className='change'>
      <div className='lista'>
        <div className='head'><h2>My Wishlist</h2></div>
        <div className='wishbook'>
          {books.map((item: any) =>
            <div className='book-delete' key={item.id}>
              <div className='book'>
                <div className='images'>
                  <img src={item.image_link} alt="" />
                </div>
                <div className='details'>
                  <div className='title'><span>
                  </span>{item.title}</div>
                  <div className='price'>
                    <span className="curr-price"> ₹{item.price - (item.price * item.discount) / 100}</span>
                    <span className="total-price">₹{item.price}</span>
                    <span className="discount">({item.discount}% OFF)</span>
                  </div>
                </div>
              </div>
           <button onClick={() => remove(item.wishlistId)} className='delete'>
                <i className="fa-duotone fa-solid fa-trash"></i>
              </button>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
