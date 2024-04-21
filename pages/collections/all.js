import React, { useEffect, useState } from "react";
import { client } from "@/lib/client";
import { Product, Collections, Sort } from "@/components";
import { useStateContext } from "@/context/StateContext";

const All = ({ products }) => {
  const [filteredResults, setFilteredResults] = useState(products);
  const { sortType, setSortType } = useStateContext();

  useEffect(() => {
    const regex = new RegExp("");
    const filteredStuff = products.filter((prod) => regex.test(prod.name));
    setFilteredResults(filteredStuff);
    setSortType("arr");
  }, []);

  const newArray = products.map((prod) => prod);
  const { compare } = Intl.Collator("en-US");

  return (
    <>
      <div className="split-screen-container">
        <div className="normal-view-collection-and-sort">
          <Collections />
        </div>
        <div className="mobile-view-collection-and-sort">
          <Collections />
          <Sort />
        </div>
        <div>
          {sortType === "asc" ? (
            <div className="products-container">
              {newArray
                .sort((a, b) => {
                  return a.price - b.price;
                })
                ?.map((item) => (
                  <Product key={item._id} product={item} />
                ))}
            </div>
          ) : sortType === "desc" ? (
            <div className="products-container">
              {newArray
                .sort((b, a) => {
                  return a.price - b.price;
                })
                ?.map((item) => (
                  <Product key={item._id} product={item} />
                ))}
            </div>
          ) : sortType === "arr" ? (
            <div className="products-container">
              {newArray
                .sort((a, b) => compare(b._createdAt, a._createdAt))
                ?.map((item) => (
                  <Product key={item._id} product={item} />
                ))}
            </div>
          ) : (
            <div className="products-container">
              {filteredResults?.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          )}
        </div>
        <div className="normal-view-collection-and-sort">
          <Sort />
        </div>
      </div>
    </>
  );
};

// in React, useEffect is used to get props on page load, but Next.js uses getServerSideProps
export const getServerSideProps = async () => {
  const query = '*[_type ==  "product"]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};
export default All;
