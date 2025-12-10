import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();        
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);   // ⭐ Cart context

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data(), qty: 1 }); // ⭐ qty included
      }
    }
    loadProduct();
  }, [id]);

  if (!product) return <p style={{ padding: 20 }}>Loading...</p>;

  // ⭐ Add To Cart
  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to Cart!");
  };

  // ⭐ Buy Now → add + go to checkout
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="detail-container">

      <div className="left-section">
        <img src={product.image} alt={product.title} className="detail-image" />
      </div>

      <div className="right-section">
        <h2 className="detail-title">{product.title}</h2>

   <div className="price-row1">
  <span className="old-price">₹{product.price}</span>

  <span className="new-price1">
    ₹{product.salePrice || product.price}
  </span>

  {product.salePrice && (
    <span className="discount1">
      {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
    </span>
  )}
</div>



        <p className="detail-desc">{product.description}</p>

       {/* ⭐ Add to Cart button (uses selling price) */}
        <button
          className="detail-cart-btn"
          onClick={() =>
            addToCart({
              ...product,
              price: product.salePrice, // buying price
              qty: 1
            })
          }
        >
          Add to Cart
        </button>

           {/* ⭐ Buy Now button (uses selling price) */}
        <button
          className="detail-buy-btn"
          onClick={() => {
            addToCart({
              ...product,
              price: product.salePrice,
              qty: 1
            });
            navigate("/checkout");
          }}
        >
          Buy Now
        </button>
      </div>

    </div>
  );
}
