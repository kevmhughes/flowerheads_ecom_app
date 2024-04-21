/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

// to be bale to import images from sanity
import { urlFor } from "@/lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h1>{heroBanner.largeText1}</h1>
        <h3>{heroBanner.midText}</h3>
        <img
          src={urlFor(heroBanner.image)}
          alt="headphones"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
