import "./Home.css";

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

// Search Context import
import { SearchContext } from "../context/SearchContext";

// Firebase imports
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const { addToCart } = useContext(CartContext);

  // Search context
  const { searchTerm } = useContext(SearchContext);

  // Firebase state
  const [products, setProducts] = useState([]);

  // Load products once
  useEffect(() => {
    async function loadProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(list);
      } catch (error) {
        console.error("Firebase Error:", error);
      }
    }

    loadProducts();
  }, []);

  // FILTER PRODUCTS USING SEARCH TERM
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <h2 style={{ marginLeft: 20 }}>Products</h2>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p style={{ marginLeft: 20, fontSize: 18 }}>No products found...</p>
        ) : (
          filteredProducts.map((p) => (
            <div className="product-card" key={p.id}>
              <img src={p.image} alt={p.title} className="product-img" />

              <h3 className="product-title">{p.title}</h3>

              <p className="product-price">₹{p.price}</p>

              <button className="add-cart-btn" onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
