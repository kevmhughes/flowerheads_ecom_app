import React, { useEffect } from "react";
// Head is the same as head element above body in html
import Head from "next/head";
import { Navbar, Footer } from ".";

import { useStateContext } from "../context/StateContext";

//children below refers to the props of the active current component
const Layout = ({ children }) => {
  // get from local storage
  const { setCartItems, setTotalQuantities, setTotalPrice } = useStateContext();
  useEffect(() => {
    // get cart items
    const parsed = localStorage.getItem("cartItems");
    const sendThis = JSON.parse(parsed);
    !sendThis ? setCartItems([]) : setCartItems(sendThis);
    // get quantity of items
    const totalQuantity = localStorage.getItem("total");
    totalQuantity && setTotalQuantities(parseInt(totalQuantity));
    // get total price
    const totalPrice = localStorage.getItem("price");
    totalPrice && setTotalPrice(parseInt(totalPrice));
  }, []);

  return (
    <div className="layout">
      <Head>
        <title>FLOWER HEADS</title>
      </Head>
      <header>
        <div className="nav-bar-sticky">
          <Navbar />
        </div>
      </header>

      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
