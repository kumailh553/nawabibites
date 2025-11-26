import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Search Context import
import { SearchContext } from "../context/SearchContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Search context se function lo
  const { setSearchTerm } = useContext(SearchContext);

  return (
    <header className="header">
      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="logo">Nawabi Bites</Link>

        {/* Hamburger (Mobile) */}
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

        {/* Search Box (working) */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
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
