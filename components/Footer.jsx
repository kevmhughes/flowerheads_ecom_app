import React from "react";
import { useStateContext } from "@/context/StateContext";
import {
  PiInstagramLogoLight,
  PiFacebookLogoLight,
  PiTiktokLogoLight,
  //PiWhatsappLogoLight,
} from "react-icons/pi";
import Link from "next/link";

const Footer = () => {
  const { showCart } = useStateContext();
  return (
    <div className={showCart ? "no-display-element" : "footer-container"}>
      <div className="icons">
        <Link href="https://flowerheads-ecom-app.vercel.app">
          <a target="_self">
            <PiInstagramLogoLight />
          </a>
        </Link>
        <Link href="https://flowerheads-ecom-app.vercel.app">
          <a target="_self">
            <PiFacebookLogoLight />
          </a>
        </Link>
        <Link href="https://flowerheads-ecom-app.vercel.app">
          <a target="_self">
            <PiTiktokLogoLight />
          </a>
        </Link>

        {/* <Link href="">
          <a target="_blank">
            <PiWhatsappLogoLight />
          </a>
        </Link> */}
      </div>
    </div>
  );
};

export default Footer;
