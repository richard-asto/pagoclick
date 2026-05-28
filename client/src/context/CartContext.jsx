import {
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

import {
  AuthContext,
} from "./AuthContext";

export const CartContext =
  createContext();

export const CartProvider = ({
  children,
}) => {

  const { user } =
    useContext(AuthContext);

  const getCartKey = () => {

    if (!user) {

      return "guest_cart";
    }

    return `cart_${user.id}`;
  };

  const [cartItems, setCartItems] =
    useState([]);

  /*
  |--------------------------------------------------------------------------
  | LOAD USER CART
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const cartKey =
      getCartKey();

    const savedCart =
      localStorage.getItem(cartKey);

    setCartItems(
      savedCart
        ? JSON.parse(savedCart)
        : []
    );

  }, [user]);

  /*
  |--------------------------------------------------------------------------
  | SAVE USER CART
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const cartKey =
      getCartKey();

    localStorage.setItem(
      cartKey,
      JSON.stringify(cartItems)
    );

  }, [cartItems, user]);

  /*
  |--------------------------------------------------------------------------
  | CART ACTIONS
  |--------------------------------------------------------------------------
  */

  const addToCart = (product) => {

    setCartItems((prev) => [
      ...prev,
      product,
    ]);
  };

  const removeFromCart = (id) => {

    setCartItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  const clearCart = () => {

    setCartItems([]);
  };

  const total = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.price),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};