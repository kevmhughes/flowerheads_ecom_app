// slug being in [] means that it is dynamic

import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { client, urlFor } from "@/lib/client";
import { Product } from "@/components";
import { useStateContext } from "@/context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, size } = product;
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd, setShowCart, setSizeChoice } =
    useStateContext();

  useEffect(() => {
    setSizeChoice(size[0]);
  }, [size]);

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  const handleSizeSelect = () => {
    setSizeChoice(selection.value);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={urlFor(image && image[index])}
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                onMouseLeave={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <h4>Description:</h4>
          <p>{details}</p>
          <p className="price">£{price}</p>
          <div className="custom-select">
            <h3>Size:</h3>
            {size.length > 1 ? (
              <div>
                <select
                  className="select-box"
                  onChange={handleSizeSelect}
                  id="selection"
                >
                  {size.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>{size[0]}</div>
            )}
          </div>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add To Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

/* getStaticProps can populate the page instantly because 1) all the product details are available at the time of build and
2) a headless CMS is being used such as sanity*/
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type ==  "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
