import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/");
      return;
    }

    setEmail(user.email);
    setPassword(localStorage.getItem("guest_password"));
  }, []);

  return (
    <div className="success-page">
      <h2>🎉 Payment Successful!</h2>
      <p>Your order has been placed successfully.</p>

      <div className="login-box">
        <h3>Your Login Details</h3>

        <p>
          <b>Email / ID:</b>
          <br />
          <span>{email}</span>
        </p>

        <p>
          <b>Password:</b>
          <br />
          <span>{password}</span>
        </p>

        <small>
          ⚠️ Please save these details for future orders.
        </small>
      </div>

      <button onClick={() => navigate("/orders")}>
        👉 View My Orders
      </button>
    </div>
  );
}
