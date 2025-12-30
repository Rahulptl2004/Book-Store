import React from 'react'

const page = () => {
  return (
    <div className='w-full flex justify-center p-9'>
      <div className='w-270 h-auto flex flex-col gap-5'>
        <div className='font-bold text-lg first-letter:text-3xl first-letter:font-semibold'>
          <h1 className=''>ABOUT US</h1>
        </div>
        <div className='font-semiboldbold text-xl'>
          <h1>Welcome !!!</h1>
        </div>
        <div className='text-gray-500 flex flex-col gap-2 text-justify'>
          <p><span className='text-black font-semibold'>OnlineBookstore </span>is India's Largest Book Store, Book Shopping Website. OnlineBookstore is an exclusive Platform for New & Used Books.</p>
          <p>
            Anyone can buy books at a reasonable price from OnlineBookstore in any part of India. OnlineBookstore customizes the book shopping experience of booklovers to a new level. We make online book shopping easier. One can buy Books of various eminent Authors and Publishers in Paperback or Hardback format.
          </p>
          <p>
            Our bookstore has a special "No Extra Shipping Charge & Fast Shipment" service on OnlineBookstore verified books. Shop books from different categories like Fiction, Non-Fiction, Self-help, Autobiography, Mystery, Romance Classics, Kid Books from the Publishers like Penguin, Harper Collins, Bloomsbury Publication, Rupa Publication Om Books International, and many more. Our Book app also has a large collection of international Bestselling books.
          </p>
        </div>
        <div className='flex flex-col text-gray-500'>
          <span><span className='text-black font-semibold'>#Awesome:-Books</span> are New & Exclusive.</span>
          <span><span className='text-black font-semibold'>#Like New:-</span>Books are a little bit old but of awesome quality.</span>
          <span><span className='text-black font-semibold'>#Average:-</span>Books are a little bit old.</span>
          <span><span className='text-black font-semibold'>#Used:-</span>Books are used but in good quality.</span>
        </div>
        <div className='text-gray-500 flex flex-col'>
          <span>*Easy Book Replacements.</span>
          <span>*24/7 Customer care service.</span>
          <span>*Fast Book Delivery</span>
          <span>*3 quality checks before shipment.</span>
        </div>
        <div className=' text-gray-500 flex flex-col'>
          <span><span className='text-black font-semibold'>Email:</span>xbookstore@gmail.com</span>
          <span><span className='text-black font-semibold'>Mobile No:</span>xxxxxx7955</span>
        </div>
      </div>
    </div>
  )
}

export default page
