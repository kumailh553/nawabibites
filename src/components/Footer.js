import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2 className="footer-title">MyStore</h2>
          <p className="footer-text">Quality products at the best prices.</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Cart</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-subtitle">Contact Us</h3>
          <p className="footer-text">📞 +91 98765 43210</p>
          <p className="footer-text">📧 support@mystore.com</p>
          <p className="footer-text">Delhi, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MyStore. All Rights Reserved.
      </div>
    </footer>
  );
}
