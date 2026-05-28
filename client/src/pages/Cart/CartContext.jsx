import {
  createContext,
  useState,
} from "react";

export const CartContext =
  createContext();

export const CartProvider = ({
  children,
}) => {

  const [cartItems, setCartItems] =
    useState([]);

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