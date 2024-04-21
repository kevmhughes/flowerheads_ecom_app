import React from "react";
import { useStateContext } from "@/context/StateContext";
import Link from "next/link";

const NavbarCollectionList = () => {
  const {
    all,
    clothes,
    accessories,
    darkSelectionFour,
    darkSelectionFive,
    darkSelectionSix,
    handleShowList,
  } = useStateContext();
  return (
    <div>
      <div className="collections">
        <Link href="/collections/all">
          <p onClick={all} className={darkSelectionFour}>
            ALL
          </p>
        </Link>
        <Link href="/collections/clothes">
          <p onClick={clothes} className={darkSelectionFive}>
            CLOTHES
          </p>
        </Link>
        <Link href="/collections/accessories">
          <p onClick={accessories} className={darkSelectionSix}>
            ACCESSORIES
          </p>
        </Link>
      </div>
      <div className="collections-mobile-view-wrapper">
        <div className="collections-mobile-view">
          <Link href="/">
            <p onClick={handleShowList}>HOME</p>
          </Link>
          <Link href="/collections/all">
            <p onClick={handleShowList}>ALL</p>
          </Link>
          <Link href="/collections/clothes">
            <p onClick={handleShowList}>CLOTHES</p>
          </Link>
          <Link href="/collections/accessories">
            <p onClick={handleShowList}>ACCESSORIES</p>
          </Link>
          <Link href="/collections/bikinis">
            <p onClick={handleShowList}>BIKINIS</p>
          </Link>
          <Link href="/collections/glasses">
            <p onClick={handleShowList}>GLASSES</p>
          </Link>
          <Link href="/collections/hats">
            <p onClick={handleShowList}>HATS</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarCollectionList;
