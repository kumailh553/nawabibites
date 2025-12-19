import React, { useRef } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import ShippingPolicy from "./pages/ShippingPolicy";
import Contact from "./pages/Contact";
import AdminOrders from "./pages/AdminOrders";

import PaymentSuccess from "./pages/PaymentSuccess";
import BreakingNews from "./components/BreakingNews";






import { ADMIN_EMAIL } from "./utils/adminAuth";
import { auth } from "./firebase";


import AdminLogin from "./pages/AdminLogin";


import ProtectedRoute from "./ProtectedRoute";   // ✅ Correct 

import WhatsAppButton from "./components/WhatsAppButton";

import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import MyOrders from "./pages/MyOrders";


function Wrapper() {



const AdminRoute = ({ children }) => {
  return auth.currentUser?.email === ADMIN_EMAIL ? children : <h2>Access Denied</h2>;
};




  const location = useLocation();
  const isHome = location.pathname === "/";

  const cartIconRef = useRef(null);

  return (
    <>
 
      <Navbar cartIconRef={cartIconRef} />
 {isHome && <BreakingNews />}
      {isHome && <Banner />}

      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home cartIconRef={cartIconRef} />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Protected Checkout */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

      

          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
<Route path="/orders" element={<MyOrders />} />

          {/* Policy pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />

<Route path="/payment-success" element={<PaymentSuccess />} />


          <Route path="/contact" element={<Contact />} />


<Route path="/admin-login" element={<AdminLogin />} />

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>


        </Routes>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
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
