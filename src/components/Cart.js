import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Cart() {
const navigate = useNavigate();

  const { cart, updateQty, removeFromCart } = useContext(CartContext);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);


useEffect(() => {
  if (cart.length === 0) {
    navigate("/");
  }
}, [cart, navigate]);


  // Apply Coupon
  const applyCoupon = () => {
    if (coupon.toLowerCase() === "nawabi10") {
      setDiscount(10);
      alert("Coupon Applied: 10% OFF!");
    } else {
      setDiscount(0);
      alert("Invalid Coupon");
    }
  };






  // Total Price Calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const finalTotal = subtotal - (subtotal * discount) / 100;

  return (
    <div className="cart-page">

      <h2 className="cart-title">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-container">

          {/* LEFT SIDE */}
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-card fade-in" key={item.id}>
                
                <img src={item.images?.[0] || item.image} alt={item.title} className="cart-img" />

                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p className="price">₹{item.price}</p>

                  {/* Quantity Section */}
                  <div className="qty-box">
                    <button onClick={() => updateQty(item.id, "dec")}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, "inc")}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="cart-summary slide-up">
            <h3>Order Summary</h3>

            <p className="summary-price">Subtotal: ₹{subtotal}</p>

            {/* Coupon Box */}
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={applyCoupon}>Apply</button>
            </div>

            {discount > 0 && <p className="discount-text">Discount: {discount}%</p>}

            <h2 className="final-total">Final Total: ₹{finalTotal}</h2>

           <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>

          </div>

        </div>
      )}
    </div>
  );
}
