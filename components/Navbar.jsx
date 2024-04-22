import React, { useState } from "react";
import Link from "next/link";
import {
  AiOutlineShopping,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { IoFlower } from "react-icons/io5";
import { Cart, NavbarCollectionList } from ".";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  
  const {
    showCart,
    setShowCart,
    totalQuantities,
    handleShowList,
    showNavbarCollectionList,
  } = useStateContext();
  return (
    <div>
      <div className="mobile-view-navbar-container">
        <div>
          <div onClick={handleShowList} className="slide-in-container">
            {showNavbarCollectionList ? (
              <AiOutlineClose className="close-square-and-hamburger-menu" />
            ) : (
              <AiOutlineMenu className="close-square-and-hamburger-menu" />
            )}
          </div>
          {showNavbarCollectionList && <NavbarCollectionList />}
        </div>
        <p className="logo">
          <Link href="/">
            <p>FLOWER HEADS</p>
          </Link>
        </p>
        <button
          type="button"
          className="cart-icon"
          onClick={() => {
            setShowCart(true);
          }}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
        {showCart && <Cart />}
      </div>
      <div className="navbar-container">
        <p className="logo">
          <Link href="/">FLOWER HEADS</Link>
          <Link href="/"><IoFlower className="flower-icon"/></Link>
          
        </p>
        <NavbarCollectionList />
        <button
          type="button"
          className="cart-icon"
          onClick={() => {
            setShowCart(true);
          }}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
