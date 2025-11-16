import React from "react";
import { Link } from "react-router-dom";

// Plain CSS styles
const headerStyle = {
  width: "100%",
  background: "#ffffff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 20px",
};

const navStyle = {
  display: "flex",
  gap: "20px",
  fontSize: "16px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: 500,
};

const iconRow = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const iconStyle = {
  fontSize: "20px",
  cursor: "pointer",
};

export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <Link to="/" style={{ ...linkStyle, fontSize: "22px", fontWeight: "bold" }}>
          MyStore
        </Link>

        {/* Categories */}

        <nav style={navStyle}>
          <Link to="/category/mens" style={linkStyle}>Mens</Link>
          <Link to="/category/womens" style={linkStyle}>Womens</Link>
          <Link to="/category/kids" style={linkStyle}>Kids</Link>
          <Link to="/category/electronics" style={linkStyle}>Electronics</Link>
<Link to="/login">Login</Link>

        </nav>


{/* Search Box */}
<div style={{ flex: 1, marginLeft: 600, marginRight: 0 }}>
<input
type="text"
placeholder="Search products..."
style={{
width: "50%",
padding: "10px 14px",
borderRadius: "6px",
border: "1px solid #ccc",
fontSize: "14px",

outline: "none"
}}
/>
</div>

        {/* Icons */}
        <div style={iconRow}>
          <Link to="/login" style={linkStyle}>
            <span style={iconStyle}>👤</span>
          </Link>

          <Link to="/cart" style={linkStyle}>
            <span style={iconStyle}>🛒</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
