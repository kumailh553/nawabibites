import React, { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  updateQty: () => {},
  removeFromCart: () => {},
  setCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ADD TO CART (with quantity & prevent duplicates)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);

      if (exists) {
        // If product already in cart, increase qty
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      // Add new product with qty = 1
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // INCREASE / DECREASE QUANTITY
  const updateQty = (id, type) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          if (type === "inc") return { ...item, qty: item.qty + 1 };
          if (type === "dec" && item.qty > 1)
            return { ...item, qty: item.qty - 1 };
        }
        return item;
      })
    );
  };

  // REMOVE ITEM FROM CART
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
