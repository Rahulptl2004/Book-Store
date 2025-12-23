import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          <div>
            <h2 className="text-2xl font-bold mb-4">Company</h2>
            <ul className="space-y-2 text-gray-300">
              <li className='cursor-pointer hover:text-red-600 transition' ><a href="">About Us</a></li>
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">Contact Us</a></li>
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">Career</a></li>
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">Library</a></li>
            </ul>
          </div>

      
          <div>
            <h2 className="text-2xl font-bold mb-4">Policies</h2>
            <ul className="space-y-2 text-gray-300">
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">Privacy Policies</a></li>
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">Terms & Conditions</a></li>
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">Secure Shopping</a></li>
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">Copyright Policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Help</h2>
            <ul className="space-y-2 text-gray-300">
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">Replacement Policy</a></li>
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">Payment</a></li>
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">Shipping Policy</a></li>
              <li className='cursor-pointer hover:text-red-600 transition'><a href="">FAQ</a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-700"></div>

      <div className="py-8 flex justify-center">
        <ul className="flex space-x-10 text-3xl">
          <li className='cursor-pointer'><i className="fa-brands fa-facebook"></i></li>
          <li className='cursor-pointer'><i className="fa-brands fa-instagram"></i></li>
          <li className='cursor-pointer'><i className="fa-brands fa-twitter"></i></li>
          <li className='cursor-pointer'><i className="fa-brands fa-linkedin"></i></li>
          <li className='cursor-pointer'><i className="fa-brands fa-youtube"></i></li>
        </ul>
      </div>

      <div className="border-t border-red-400 py-4 text-sm text-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          <p>© 2025 All rights reserved by Mk Information Service Pvt Ltd.</p>
          <p>Powered by : Mk Publications Pvt Ltd</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer
