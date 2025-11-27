import React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Login from "./pages/Login";

import WhatsAppButton from "./components/WhatsAppButton";   // ✅ IMPORT ADDED

import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";

function Wrapper() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />

      {/* Banner only on HOME page */}
      {isHome && <Banner />}

      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      <Footer />

      <WhatsAppButton />   {/* ✅ FLOATING WHATSAPP BUTTON */}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <Wrapper />
        </Router>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
