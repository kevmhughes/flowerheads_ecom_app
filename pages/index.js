import React, { useState } from "react";
import { client } from "@/lib/client";
import { AiOutlineSearch } from "react-icons/ai";
import { Product, FooterBanner, HeroBanner } from "@/components";
import { useStateContext } from "@/context/StateContext";

const Home = ({ products, bannerData }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredResults, setFilteredResults] = useState(products);

  // seach bar filter
  const handleFilter = (event) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    setSearchText(event.target.value);
    const filteredStuff = products.filter((prod) => regex.test(prod.name));
    setFilteredResults(filteredStuff);
  };

  const { showCart, showNavbarCollectionList } = useStateContext();

  const newProductsArray = products.map((item) => item);
  const { compare } = Intl.Collator("en-US");

  return (
    <>
      <div className="mobile-view-align">
        <div
          className={
            showCart || showNavbarCollectionList
              ? "no-display-element"
              : "input-search-bar-container"
          }
        >
          <input
            className="input-search-bar"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleFilter}
            required
          />
          <AiOutlineSearch
            size={20}
            color="gray"
            className="input-search-symbol"
          />
        </div>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

        {searchText ? (
          <div className="products-container-main">
            {filteredResults.map((prod) => (
              <Product key={prod._id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="products-container-main">
            {newProductsArray
              ?.sort((a, b) => compare(b._updatedAt, a._updatedAt))
              ?.map((item) => (
                <Product key={item._id} product={item} />
              ))}
          </div>
        )}

        <FooterBanner footerBanner={bannerData && bannerData[0]} />
      </div>
    </>
  );
};

// in React, useEffect is used to get props on page load, but Next.js uses getServerSideProps
export const getServerSideProps = async () => {
  const query = '*[_type ==  "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type ==  "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
export default Home;
