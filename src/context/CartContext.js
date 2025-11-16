import React, { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  setCart: () => {}
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
