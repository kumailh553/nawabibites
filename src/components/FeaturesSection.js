// src/components/FeaturesSection.js
import React from "react";
import "./FeaturesSection.css";

export default function FeaturesSection() {
  return (
    <div className="features-section">
      <div className="feature-card">
        <div className="icon">🚚</div>
        <h3>Free Delivery</h3>
        <p>Free delivery all over India on every order</p>
      </div>

      <div className="feature-card">
        <div className="icon">🔒</div>
        <h3>Secure Payment</h3>
        <p>100% safe & secure payments with trusted gateways</p>
      </div>

      <div className="feature-card">
        <div className="icon">📞</div>
        <h3>Support Available</h3>
        <p>Friendly support available for your help</p>
      </div>
    </div>
  );
}
