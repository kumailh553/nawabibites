import "./Home.css";







import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import addSound from "../assets/add-to-cart.mp3";
import FeaturesSection from "../components/FeaturesSection";



import { Link, useNavigate } from "react-router-dom";


export default function Home({ cartIconRef }) {
  const { addToCart } = useContext(CartContext);
  const { searchTerm } = useContext(SearchContext);
const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  // ⭐ Make a ref array
  const imgRefs = useRef({});


const playAddSound = () => {
  const audio = new Audio(addSound);
  audio.volume = 0.6;  // smooth volume
  audio.play();
};


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

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm)
  );

  // ⭐ Fly animation function
  const flyToCart = (imgElement) => {
    if (!imgElement || !cartIconRef?.current) return;

    const imgRect = imgElement.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    const flyingImg = imgElement.cloneNode(true);
    flyingImg.style.position = "fixed";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.transition = "all 0.7s ease";
    flyingImg.style.zIndex = "9999";
    document.body.appendChild(flyingImg);

    setTimeout(() => {
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.width = "20px";
      flyingImg.style.height = "20px";
      flyingImg.style.opacity = "0.2";
    }, 50);

    setTimeout(() => flyingImg.remove(), 800);
  };

  return (
    <div>
      <h2 style={{ marginLeft: 20 }}>Products</h2>

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p style={{ marginLeft: 20 }}>No products found...</p>
        ) : (
          filteredProducts.map((p) => (
            <div className="product-card" key={p.id}>
              <Link to={`/product/${p.id}`} className="product-link">
                <img
                  ref={(el) => (imgRefs.current[p.id] = el)}
                  src={p.image}
                  alt={p.title}
                  className="product-img"
                />
                <h3>{p.title}</h3>
   <div className="price-row">
  <span className="old-price">₹{p.price}</span>
  <span className="new-price">₹{p.salePrice}</span>
  <span className="discount">
    {Math.round(((p.price - p.salePrice) / p.price) * 100)}% OFF
  </span>
</div>


              </Link>

        <div className="card-buttons">
  <button
    className="add-cart-btn"
    onClick={() => {
      flyToCart(imgRefs.current[p.id]);
      playAddSound();
     addToCart({
  ...p,
  price: p.salePrice,   // 🔥 Correct selling price
  qty: 1
 });
    }}
  >
    Add to Cart
  </button>

  <button
    className="buy-now-btn"
    onClick={() => {
        addToCart({
        ...p,
        price: p.salePrice,
        qty: 1
      });
      navigate("/checkout");
  playAddSound();
    }}
  >
    Buy Now
  </button>





</div>


            </div>
          ))
        )}
      </div>

   <FeaturesSection />


    </div>

  );
}
