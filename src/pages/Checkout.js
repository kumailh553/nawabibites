import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

import { db, auth } from "../firebase";
import { collection,addDoc, Timestamp,setDoc, doc, getDoc} from "firebase/firestore";


import { useNavigate } from "react-router-dom";



import emailjs from "@emailjs/browser";





export default function Checkout() {






  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
















const orderItemsHTML = cart.map(item => `
<tr>
  <td style="padding: 12px 8px;">
    <img src="${item.image}" height="60" />
  </td>
  <td>
    <b>${item.title}</b><br/>
    Qty: ${item.qty}
  </td>
  <td><b>₹${item.price * item.qty}</b></td>
</tr>
`).join("");





 


 // ⭐ Address state FIRST
const [address, setAddress] = useState({
  name: "",
  phone: "",
  pincode: "",
  city: "",
state: "",   
  house: "",
  area: "",
});


// Redirect if cart is empty
useEffect(() => {
  if (cart.length === 0) {
    navigate("/");
  }
}, [cart, navigate]);




// ⭐ Auto-Fill User Address from Firebase
useEffect(() => {
  async function loadSavedAddress() {
    if (!auth.currentUser) return;

    const ref = doc(db, "users", auth.currentUser.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setAddress(snap.data());   // ⭐ Auto fill
    }
  }

  loadSavedAddress();
}, []);


const detectLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      // Reverse Geocoding API (no key required)
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      const response = await fetch(url);
      const data = await response.json();

      const addr = data.address;

      setAddress(prev => ({
        ...prev,
        city: addr.city || addr.town || "",
        pincode: addr.postcode || "",
state: addr.state || "",
       
      }));

      alert("Location detected successfully!");

    } catch (error) {
      console.error(error);
      alert("Unable to fetch location details.");
    }
  });
};


  // 🔹 Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const delivery = 0;
  const finalTotal = subtotal + delivery;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // ==========================
  // 🔥 CASHFREE PAYMENT
  // ==========================
  const handleCashfreePayment = async () => {
    if (
      !address.name ||
      !address.phone ||
      !address.pincode ||
      !address.city ||
      !address.state ||
      !address.house ||
      !address.area
    ) {
      alert("Please fill all address details");
      return;
    }

    try {
      // 1️⃣ Create Cashfree Order (Backend)
      const res = await fetch(
        "https://mukaishworkspecialist.com/create-order.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_amount: Number(finalTotal),
            customer_name: address.name,
            customer_email: auth.currentUser?.email || "guest@nawabibites.com",
            customer_phone: address.phone,
          }),
        }
      );

      const data = await res.json();

      if (!data.payment_session_id || !data.order_id) {
        alert("unable to payment");
        return;
      }

 const cashfreeOrderId = data.order_id;




      // 3️⃣ Open Cashfree Checkout
      const cashfree = new window.Cashfree({
        mode: "production", // sandbox if testing
      });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed");
    }
  };

 


  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-container">
        
        <div className="address-box">
          <h3>Delivery Address</h3>

  {/* ⭐ Detect Location Button */}
          <button className="detect-btn" onClick={detectLocation}>
            📍 Detect My Location
          </button>

         <input 
  name="name"
  value={address.name}
  placeholder="Full Name"
  onChange={handleChange}
/>

          <input name="phone" value={address.phone} placeholder="Phone Number" onChange={handleChange} />
<input name="pincode" value={address.pincode} placeholder="Pincode" onChange={handleChange} />
<input name="city" value={address.city} placeholder="City" onChange={handleChange} />


<select 
  name="state"
  value={address.state}
  onChange={handleChange}
>
  <option value="">Select State</option>
  <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Assam">Assam</option>
  <option value="Bihar">Bihar</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Delhi">Delhi</option>
  <option value="Goa">Goa</option>
  <option value="Gujarat">Gujarat</option>
  <option value="Haryana">Haryana</option>
  <option value="Himachal Pradesh">Himachal Pradesh</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Kerala">Kerala</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Manipur">Manipur</option>
  <option value="Meghalaya">Meghalaya</option>
  <option value="Mizoram">Mizoram</option>
  <option value="Nagaland">Nagaland</option>
  <option value="Odisha">Odisha</option>
  <option value="Punjab">Punjab</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Sikkim">Sikkim</option>
  <option value="Tamil Nadu">Tamil Nadu</option>
  <option value="Telangana">Telangana</option>
  <option value="Tripura">Tripura</option>
  <option value="Uttar Pradesh">Uttar Pradesh</option>
  <option value="Uttarakhand">Uttarakhand</option>
  <option value="West Bengal">West Bengal</option>
</select>



<input name="house" value={address.house} placeholder="House / Flat No." onChange={handleChange} />
<textarea
  name="area"
  value={address.area}
  placeholder="Road Name, Area, Colony"
  onChange={handleChange}
/>

        </div>

        <div className="summary-box">
          <h3>Order Summary</h3>

          <div className="summary-list">
            {cart.map((item) => (
              <div className="summary-item" key={item.id}>
                <img src={item.images?.[0] || item.image} alt="" />
                <div>
                  <p>{item.title}</p>
                  <p>Qty: {item.qty}</p>
                </div>
                <strong>₹{item.price * item.qty}</strong>
              </div>
            ))}
          </div>

          <hr />

          <p className="summary-row">
            <span>Subtotal:</span>
            <strong>₹{subtotal}</strong>
          </p>

          <p className="summary-row">
            <span>Delivery:</span>
            <strong>{delivery === 0 ? "FREE" : `₹${delivery}`}</strong>
          </p>

          <h2 className="summary-total">Total: ₹{finalTotal}</h2>

      

<button className="place-btn" onClick={handleCashfreePayment}>
  Pay Securely
</button>



        </div>
      </div>
    </div>
  );
}

