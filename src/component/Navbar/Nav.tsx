"use client";
import React, { useState } from "react";
import "../style/nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav">

      <div className="mobile-search">
        <a href="/">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
      </div>


      <div className="img">
        <img src="../../bookLogo.svg" alt="Book Store Logo" />
      </div>

      <div className="list">
        <ul>
          <li><a href="./">Home</a></li>
          <li><a href="./category">Library</a></li>
          <li><a href="">Privacy Policy</a></li>
           <li><a href="./admin">Admin</a></li>
          <li><a href="">About us</a></li>
        </ul>
      </div>

      <div className="search">
        <ul className="ul1">
          <li><a href="/searchBook"><i className="fa fa-search" aria-hidden="true"></i></a></li>
          <li><a href="/"><i className="fa fa-book" aria-hidden="true"></i></a></li>
          <li><a href="/cart"><i className="fa fa-cart-plus" aria-hidden="true"></i></a></li>
          <li><a href="/profile"><i className="fa fa-user" aria-hidden="true"></i></a></li>
        </ul>
      </div>


      <div className="navIcon">
        <button onClick={toggleMenu}>
          <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
        </button>
      </div>
      {menuOpen && (
        <div className="openNavicon">
          <div className="menuOption">
            <ul>
              <li><a href="">Home</a></li>
              <li><a href="">Library</a></li>
              <li><a href="">Cart</a></li>
              <li><a href="">Contact us</a></li>
              <li><a href="">About us</a></li>
              <li><a href="">Privacy Policy</a></li>
              <li><a href="">Replacement Policy</a></li>
              <li><a href="">Account</a></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
