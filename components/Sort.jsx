import React from "react";
import { useStateContext } from "@/context/StateContext";

const Sort = () => {
  const {
    asc,
    desc,
    latArrivals,
    darkSelection,
    darkSelectionTwo,
    darkSelectionThree,
    setSortType,
  } = useStateContext();

  const handleSorter = (e) => {
    setSortType(e.target.value);
  };

  return (
    <div>
      <div className="side-container">
        <div className="choosers">Sort by</div>
        <p onClick={latArrivals} className={darkSelection}>
          Latest arrivals
        </p>
        <p onClick={asc} className={darkSelectionTwo}>
          Price: low to high
        </p>
        <p onClick={desc} className={darkSelectionThree}>
          Price: high to low
        </p>
      </div>
      <div className="side-container-mobile">
        <div className="choosers">sort</div>
        <label>
          <select
            className="mobile-select-box"
            id="selection"
            onChange={handleSorter}
          >
            <option value="latArrivals">Latest arrivals</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Sort;
