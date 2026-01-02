"use client";
import React, { useState } from "react";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const iconClass =
    "w-10 h-10 flex items-center justify-center text-xl";

  return (
    <>
      <nav className="fixed top-0 w-full bg-white border-b border-gray-300 z-50">
        <div className="flex items-center justify-between px-4 py-2 relative">


          <div className="md:hidden">
            <a href="/searchBook" className={iconClass}>
              <i className="fa fa-search"></i>
            </a>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <img src="/bookLogo.svg" alt="Book Store" className="h-10" />
          </div>

          <ul className="hidden md:flex gap-6 font-medium">
            <li><a className="" href="/">Home</a></li>
            <li><a className="" href="/category">Library</a></li>
            <li><a className="" href="./about">About Us</a></li>
            <li><a href="/admin">Admin</a></li>
            <li><a className="" href="/privacy">Privacy Policy</a></li>
            <li><a className="" href="/replacement">Replacement Policy</a></li>
          </ul>


          <div className="flex items-center gap-1">
            <a
              href="/searchBook"
              className="hidden sm:flex w-10 h-10 items-center justify-center text-xl "
            >
              <i className="fa fa-search"></i>
            </a>
            <a
              href="/"
              className="hidden sm:flex w-10 h-10 items-center justify-center text-xl "
            >
              <i className="fa fa-book"></i>
            </a>

            <a
              href="/cart"
              className=" hidden sm:flex relative  w-10 h-10 items-center justify-center text-xl">
              <i className="fa fa-cart-plus"></i>
            </a>


            <a
              href="/profile"
              className="hidden sm:flex  w-10 h-10 items-center justify-center text-xl"
            >
              <i className="fa fa-user"></i>
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden flex w-10 h-10 items-center justify-center text-2xl"
            >
              <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>

          </div>

        </div>
      </nav>
      {menuOpen && (
        <div className="fixed top-[56px] left-0 w-full bg-red-200 border-t z-40 md:hidden">
          <ul className="flex flex-col gap-4 p-4 text-lg font-medium">
            <li><a className="" href="/">Home</a></li>
            <li><a className="" href="/category">Library</a></li>
            <li><a className="" href="/cart">Cart</a></li>
            <li><a className="" href="/profile">Account</a></li>
            <li><a className="" href="./about">About Us</a></li>
            <li><a href="/admin">Admin</a></li>
            <li><a className="" href="/privacy">Privacy Policy</a></li>
            <li><a className="" href="/replacement">Replacement Policy</a></li>
          </ul>
        </div>
      )}
      <div className="h-14"></div>
    </>
  );
};

export default Nav;
