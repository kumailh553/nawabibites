import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-wrapper">
      <div className="success-card">
        <div className="checkmark">✓</div>

        <h2>Payment Successful 🎉</h2>

        <p>
          Thank you for shopping with <b>Nawabi Bites</b> ❤️  
          <br />
          Your order has been placed successfully.
        </p>

        <button
          className="view-order-btn"
          onClick={() => navigate("/orders")}
        >
          📦 View My Order
        </button>

        <p className="note">
          You will receive tracking details once your order is shipped.
        </p>
      </div>
    </div>
  );
}
