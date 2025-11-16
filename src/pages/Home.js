import React, { useContext } from "react";
import products from "../data/products";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h2>Products</h2>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 16,
              width: 200
            }}
          >
            <img src={p.image} alt={p.name} width="100%" />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
