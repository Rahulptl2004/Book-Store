"use client"
import React, { useEffect, useState } from 'react'
import '../style/similar.css'
import axios from 'axios'

const SimilarBook = ({ Category }: any) => {
  const [showDetail, setShowDetail] = useState<any[]>([])
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
       setLoading(true); 
      const res = await axios.get(`/api/profile/simiBook?Category=${Category}`);
      setShowDetail(res.data.data || []);

    } catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    // if (Category)
    getData();
  }, [Category]);
  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }
  return (
    <div className='all-Books'>
      {(showDetail || []).map((Book: any) => (
        <a key={Book.id} href={`/infoBook?id=${Book.id}`} className='book'>
          <img src={Book.image_link} alt='' />
          <div className='Book-details'>
            <h1 className='title'>{Book.title}</h1>
            <div className='price'>
              <span className='curr-price'>
                ₹{Book.price - (Book.price * Book.discount / 100)}
              </span>
              <span className='total-price'>₹{Book.price}</span>
              <span className='discount'>
                ({Book.discount}% OFF)
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default SimilarBook
