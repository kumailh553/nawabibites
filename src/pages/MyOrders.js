import React, { useEffect, useState, } from "react";
import { auth, db } from "../firebase";

  import { onAuthStateChanged } from "firebase/auth";
import {  collection,  query,  where,  onSnapshot,  orderBy,getDocs} from "firebase/firestore";
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("PAID"); // default


  useEffect(() => {
    async function loadOrders() {
      const user = auth.currentUser;
      if (!user) return;

  const q = query(
  collection(db, "orders"),
  where("email", "==", user.email)
);


      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data.reverse()); // latest first
      setLoading(false);
    }

    loadOrders();
  }, []);



  if (!auth.currentUser) {
    return <h2 style={{ padding: 20 }}>Please login to view your orders.</h2>;
  }

  if (loading) {
    return <h2 className="loading">Loading orders...</h2>;
  }

  // ✅ FILTER LOGIC (IMPORTANT)
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "PAID") return order.status === "PAID";
    if (activeTab === "ALL") return true;
    return false;
  });

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {/* 🔥 PANEL */}
      <div className="order-panel">
        <button
          className={activeTab === "PAID" ? "active" : ""}
          onClick={() => setActiveTab("PAID")}
        >
          ✅ Paid Orders
        </button>

        <button
          className={activeTab === "ALL" ? "active" : ""}
          onClick={() => setActiveTab("ALL")}
        >
          📦 UN-PAID
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <h3>Order ID: {order.id}</h3>
                <span className="order-date">
                  {order.createdAt?.toDate?.().toLocaleString()}
                </span>
              </div>

              {/* STATUS */}
              <p className={`order-status ${order.status?.toLowerCase()}`}>
                Status: {order.status}
              </p>

              {/* TRACKING */}
              <div className="tracking-box">
                <strong>Tracking ID:</strong>{" "}
                {order.trackingId ? (
                  <span style={{ color: "green" }}>{order.trackingId}</span>
                ) : (
                  <span style={{ color: "red" }}>Not generated</span>
                )}
              </div>


{order.trackingUrl && (
  <button
    className="track-btn"
    onClick={() => window.open(order.trackingUrl, "_blank")}
  >
    🚚 Track Order
  </button>
)}




              {/* ITEMS */}
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div className="order-item" key={i}>
                    <img src={item.image} alt="" />
                    <div>
                      <p className="item-title">{item.title}</p>
                      <p className="qty">Qty: {item.qty}</p>
                    </div>
                    <strong>₹{item.qty * item.price}</strong>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="order-footer">
                <p>Subtotal: ₹{order.subtotal}</p>
                <p>Delivery: ₹{order.deliveryCharge}</p>
                <h3>Total Paid: ₹{order.total}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
