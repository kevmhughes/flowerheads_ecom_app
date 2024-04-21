import React from "react";
import Link from "next/link";

import { urlFor } from "@/lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    smallText,
    midText,
    saleTime,
    desc,
    buttonText,
    image,
    product,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <h3>{largeText2}</h3>
          <h2>{discount}</h2>
        </div>
        <div className="right">
          {/* <p>{desc}</p> */}
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image)} className="footer-banner-image" />
      </div>
    </div>
  );
};

export default FooterBanner;
