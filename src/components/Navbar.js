import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";
import { auth } from "../firebase";

import logo from "../assets/logo.png";

export default function Header({ cartIconRef }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setSearchTerm } = useContext(SearchContext);
  const [userName, setUserName] = useState("");
const [dropdownOpen, setDropdownOpen] = useState(false);


const { cart } = useContext(CartContext); // ⭐ cart count

  const navigate = useNavigate();
const dropdownRef = useRef(null);

  // 👤 Check Login
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const emailName = user.email.split("@")[0];
        setUserName(emailName);
      } else {
        setUserName("");
      }
    });
  }, []);

  // 🔥 Logout
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };


 // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);





  return (
    <header className="header">
      <div className="nav-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          <img src={logo} alt="Nawabi Bites" className="logo-img" />
        </Link>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Navigation Links */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/category/mens">Mens</Link>
          <Link to="/category/womens">Womens</Link>
          <Link to="/category/kids">Kids</Link>
          <Link to="/category/electronics">Electronics</Link>
        </nav>

        {/* Search Box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>

      {/* ICONS */}
        <div className="icons" ref={dropdownRef}>

          {/* 👤 Username + Dropdown */}
          {userName ? (
            <div className="profile-area">
              <span
                className="username"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                👤 {userName}
              </span>

              {/* DROPDOWN */}
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <Link to="/orders" onClick={() => setDropdownOpen(false)}>
                    📦 My Orders
                  </Link>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">👤</Link>
          )}


          {/* CART ICON */}

  <div className="cart-wrapper">

          <Link to="/cart" className="cart-icon" ref={cartIconRef}>
            🛒
          </Link>
     {/* BADGE */}
            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </div>


        </div>
      </div>
    </header>
  );
}
