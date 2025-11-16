import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ccc", padding: "12px", borderRadius: "6px" }}>
              <img src={item.image} alt={item.name} style={{ width: "60px", borderRadius: "4px" }} />
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <button onClick={() => removeFromCart(item.id)} style={{ padding: "6px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
}
