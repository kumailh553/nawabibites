import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2 className="footer-title">NAWABI BITES</h2>
          <p className="footer-text">Nawabi Bites – Where tradition meets taste. Enjoy our handcrafted Mathri, made with love, purity and the richness of authentic Indian snacks.

Nawabi Bites brings you crispy, flavourful Mathri made with premium ingredients. Pure, hygienic and traditionally prepared for a truly royal snacking experience.

</p>
        </div>

        <div className="footer-section2">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/refund-policy">Refund & Cancellation</Link></li>
            <li><Link to="/shipping-policy">Shipping & Delivery</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>


          </ul>
        </div>

        <div className="footer-section3">
          <h3 className="footer-subtitle">Contact Us</h3>
          <p className="footer-text">📞 +91 7355470907</p>
          <p className="footer-text">📧 kumailh553@gmail.com</p>
          <p className="footer-text">📍456/62,Waqe Mohalla,</p>
 <p className="footer-text"> Daulatganj,lucknow,U.P,India</p>
 <p className="footer-text">FSSAI Licence No.2272571000524</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Nawabi Bites. All Rights Reserved.
      </div>
    </footer>
  );
}
