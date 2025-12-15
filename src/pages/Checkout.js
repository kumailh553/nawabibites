import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // =====================
  // ADDRESS STATE
  // =====================
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    house: "",
    area: "",
  });

  // =====================
  // AUTH CHECK
  // =====================
  useEffect(() => {
    if (!auth.currentUser) navigate("/auth");
  }, [navigate]);

  // =====================
  // EMPTY CART CHECK
  // =====================
  useEffect(() => {
    if (cart.length === 0) navigate("/");
  }, [cart, navigate]);

  // =====================
  // LOAD SAVED ADDRESS
  // =====================
  useEffect(() => {
    async function loadAddress() {
      if (!auth.currentUser) return;
      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setAddress(snap.data());
    }
    loadAddress();
  }, []);

  // =====================
  // TOTAL CALCULATION
  // =====================
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const delivery = 0; // ✅ FREE DELIVERY
  const finalTotal = subtotal + delivery;

  // =====================
  // INPUT HANDLER
  // =====================
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // =====================
  // CASHFREE PAYMENT
  // =====================
  const handleCashfreePayment = async () => {
    try {
      // save data temporarily
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("address", JSON.stringify(address));
      localStorage.setItem("total", finalTotal);

      const res = await fetch(
        "https://mukaishworkspecialist.com/create_order.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: finalTotal,
            name: address.name,
            email: auth.currentUser.email,
            phone: address.phone,
          }),
        }
      );

      const data = await res.json();

      if (!data.payment_session_id) {
        alert("Payment initiation failed");
        return;
      }

      const cashfree = new window.Cashfree({
        mode: "production", // 🔁 sandbox if testing
      });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error(err);
      alert("Payment error!");
    }
  };

  // =====================
  // PLACE ORDER BUTTON
  // =====================
  const placeOrder = async () => {
    if (
      !address.name ||
      !address.phone ||
      !address.pincode ||
      !address.city ||
      !address.state ||
      !address.house ||
      !address.area
    ) {
      alert("Please fill all address details!");
      return;
    }

    // save/update address
    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      address,
      { merge: true }
    );

    handleCashfreePayment();
  };

  // =====================
  // UI
  // =====================
  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-container">
        {/* ADDRESS */}
        <div className="address-box">
          <h3>Delivery Address</h3>

          <input
            name="name"
            placeholder="Full Name"
            value={address.name}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={address.phone}
            onChange={handleChange}
          />
          <input
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
          />

          <select name="state" value={address.state} onChange={handleChange}>
            <option value="">Select State</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Delhi">Delhi</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Bihar">Bihar</option>
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
          </select>

          <input
            name="house"
            placeholder="House / Flat No."
            value={address.house}
            onChange={handleChange}
          />

          <textarea
            name="area"
            placeholder="Road, Area, Landmark"
            value={address.area}
            onChange={handleChange}
          />
        </div>

        {/* SUMMARY */}
        <div className="summary-box">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div className="summary-item" key={item.id}>
              <img src={item.image} alt="" />
              <div>
                <p>{item.title}</p>
                <p>Qty: {item.qty}</p>
              </div>
              <strong>₹{item.price * item.qty}</strong>
            </div>
          ))}

          <hr />

          <p className="summary-row">
            <span>Subtotal</span>
            <strong>₹{subtotal}</strong>
          </p>

          <p className="summary-row">
            <span>Delivery</span>
            <strong>FREE</strong>
          </p>

          <h2 className="summary-total">Total: ₹{finalTotal}</h2>

          <button className="place-btn" onClick={placeOrder}>
            Pay Securely
          </button>
        </div>
      </div>
    </div>
  );
}