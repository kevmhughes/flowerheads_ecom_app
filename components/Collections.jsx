import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";

const Collections = () => {
  const [first, setfirst] = useState("");
  useEffect(() => {
    const currentUrl = window.location.href;
    const defaultValue = currentUrl.slice(34);
    setfirst(defaultValue);
  }, []);

  const {
    all,
    clothes,
    accessories,
    bikinis,
    glasses,
    hats,
    darkSelectionFour,
    darkSelectionFive,
    darkSelectionSix,
    darkSelectionSeven,
    darkSelectionEight,
    darkSelectionNine,
  } = useStateContext();

  const router = useRouter();

  const array = ["all", "clothes", "accessories", "bikinis", "glasses", "hats"];

  const handlePageSelect = (e) => {
    router.push(`/collections/${e.target.value}`);
  };

  return (
    <div>
      <div className="side-container">
        <div className="choosers">collections</div>
        <Link href="/collections/all">
          <p onClick={all} className={darkSelectionFour}>
            All
          </p>
        </Link>

        <Link href="/collections/clothes">
          <p onClick={clothes} className={darkSelectionFive}>
            Clothes
          </p>
        </Link>
        <Link href="/collections/accessories">
          <p onClick={accessories} className={darkSelectionSix}>
            Accesories
          </p>
        </Link>
        <Link href="/collections/bikinis">
          <p onClick={bikinis} className={darkSelectionSeven}>
            Bikinis
          </p>
        </Link>
        <Link href="/collections/glasses">
          <p onClick={glasses} className={darkSelectionEight}>
            Glasses
          </p>
        </Link>
        <Link href="/collections/hats">
          <p onClick={hats} className={darkSelectionNine}>
            Hats
          </p>
        </Link>
      </div>
      <div className="side-container-mobile">
        <div className="choosers">collections</div>
        <div>
          <select
            id="selection"
            className="mobile-select-box"
            onChange={handlePageSelect}
            value={first}
          >
            {array.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Collections;
