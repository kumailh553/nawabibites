import React from "react";

export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <img src={product.image} alt={product.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>
      <button onClick={() => alert("Add to cart - implement later")}>Add to cart</button>
    </div>
  );
}
