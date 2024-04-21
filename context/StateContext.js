import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [sizeChoice, setSizeChoice] = useState("");
  const [sortType, setSortType] = useState("arr");
  const [collectionType, setCollectionType] = useState("all");
  const [showNavbarCollectionList, setShowNavbarCollectionList] =
    useState(false);

  let foundProduct;
  let index;

  //add a product to the shoppibg trolley
  const onAdd = (product, quantity) => {
    // check to see if the product is already in the shopping trolley
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    /* check to see if the product is already in the shopping trolley, but this check is based on 
    the name and size given that the product.id cannot be repeated when the same product is added
    to the shopping trolley with different sizes */
    const checkProductInCartTwo = cartItems.find(
      (item) => item.name === product.name && item.choice === sizeChoice
    );
    // 
    if (product.size.length === 1) {
      const foundProductTwo = cartItems.find(
        (item) =>
          item.size.length === 1 &&
          item.name === product.name &&
          item.choice === sizeChoice
      );
      const index = cartItems.findIndex(
        (item) =>
          item.size.length === 1 &&
          item.name === product.name &&
          item.choice === sizeChoice
      );

      const newCartItemsArrayTwo = cartItems.filter((item) => item);
      newCartItemsArrayTwo.splice(index, index + 1);
      if (checkProductInCart) {
        setCartItems([
          ...newCartItemsArrayTwo.slice(0, index),
          { ...foundProductTwo, quantity: foundProductTwo.quantity + quantity },
          ...newCartItemsArrayTwo.slice(index),
        ]);

        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + product.price * quantity
        );
        setTotalQuantities(
          (prevTotalQuantities) => prevTotalQuantities + quantity
        );

        toast.success(`${qty} x ${product.name} added to the cart.`);
      } else {
        product.quantity = quantity;
        product.choice = sizeChoice;

        setCartItems([...cartItems, { ...product }]);

        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + product.price * quantity
        );
        setTotalQuantities(
          (prevTotalQuantities) => prevTotalQuantities + quantity
        );

        toast.success(`${qty} x ${product.name} added to the cart.`);
      }
    } else if (product.size.length >= 2) {
      const foundProductTwo = cartItems.find(
        (item) =>
          item.size.length >= 2 &&
          item.name === product.name &&
          item.choice === sizeChoice
      );
      const index = cartItems.findIndex(
        (item) =>
          item.size.length >= 2 &&
          item.name === product.name &&
          item.choice === sizeChoice
      );

      const newCartItemsArray = cartItems.filter((item) => item);
      newCartItemsArray.splice(index, index + 1);
      if (checkProductInCartTwo) {
        setCartItems([
          ...newCartItemsArray.slice(0, index),
          { ...foundProductTwo, quantity: foundProductTwo.quantity + quantity },
          ...newCartItemsArray.slice(index),
        ]);

        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + product.price * quantity
        );
        setTotalQuantities(
          (prevTotalQuantities) => prevTotalQuantities + quantity
        );

        toast.success(`${qty} x ${product.name} added to the cart.`);
      } else {
        product.quantity = quantity;
        product.choice = sizeChoice;
        product._id = "f" + product._id;

        setCartItems([...cartItems, { ...product }]);

        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + product.price * quantity
        );
        setTotalQuantities(
          (prevTotalQuantities) => prevTotalQuantities + quantity
        );

        toast.success(`${qty} x ${product.name} added to the cart.`);
      }
    }
  };

  // set local storage
  useEffect(() => {
    let string = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", string);
    localStorage.setItem("total", totalQuantities);
    localStorage.setItem("price", totalPrice);
    setQty(1);
  }, [cartItems]);

  // remove a product from the cart
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  // change quantity of a cart item in the cart
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems.slice(0, index),
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ...newCartItems.slice(index),
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems.slice(0, index),
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ...newCartItems.slice(index),
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  // dynamic styling of sort type and collection type
  const asc = () => {
    setSortType("asc");
  };

  const desc = () => {
    setSortType("desc");
  };

  const latArrivals = () => {
    setSortType("arr");
  };

  const all = () => {
    setCollectionType("all");
  };

  const clothes = () => {
    setCollectionType("clothes");
  };

  const accessories = () => {
    setCollectionType("accessories");
  };

  const bikinis = () => {
    setCollectionType("bikinis");
  };

  const glasses = () => {
    setCollectionType("glasses");
  };

  const hats = () => {
    setCollectionType("hats");
  };

  // css for sort types
  const darkSelection = sortType === "arr" ? "pointer-darker" : "pointer";
  const darkSelectionTwo = sortType === "asc" ? "pointer-darker" : "pointer";
  const darkSelectionThree = sortType === "desc" ? "pointer-darker" : "pointer";

  // css for collection types
  const darkSelectionFour =
    collectionType === "all" ? "pointer-darker" : "pointer";
  const darkSelectionFive =
    collectionType === "clothes" ? "pointer-darker" : "pointer";
  const darkSelectionSix =
    collectionType === "accessories" ? "pointer-darker" : "pointer";
  const darkSelectionSeven =
    collectionType === "bikinis" ? "pointer-darker" : "pointer";
  const darkSelectionEight =
    collectionType === "glasses" ? "pointer-darker" : "pointer";
  const darkSelectionNine =
    collectionType === "hats" ? "pointer-darker" : "pointer";

  const handleShowList = () => {
    setShowNavbarCollectionList((current) => !current);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        onRemove,
        sizeChoice,
        setSizeChoice,
        setSortType,
        sortType,
        asc,
        desc,
        latArrivals,
        all,
        clothes,
        accessories,
        bikinis,
        glasses,
        hats,
        darkSelection,
        darkSelectionTwo,
        darkSelectionThree,
        darkSelectionFour,
        darkSelectionFive,
        darkSelectionSix,
        darkSelectionSeven,
        darkSelectionEight,
        darkSelectionNine,
        collectionType,
        handleShowList,
        showNavbarCollectionList,
        setShowNavbarCollectionList,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
