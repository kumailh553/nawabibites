import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

import Login from "./pages/Login";   // ← IMPORTANT
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Banner />

        <div style={{ padding: 16 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />   {/* ← ADDED */}
          </Routes>
        </div>

        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
