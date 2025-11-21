import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="logo">MyStore</Link>

        {/* Hamburger Button (Mobile Only) */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Navigation Links */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/category/mens">Mens</Link>
          <Link to="/category/womens">Womens</Link>
          <Link to="/category/kids">Kids</Link>
          <Link to="/category/electronics">Electronics</Link>
          <Link to="/login">Login</Link>
        </nav>

        {/* Search Box */}
        <div className="search-box">
          <input type="text" placeholder="Search products..." />
        </div>

        {/* Icons */}
        <div className="icons">
          <Link to="/login">👤</Link>
          <Link to="/cart">🛒</Link>
        </div>
      </div>
    </header>
  );
}
