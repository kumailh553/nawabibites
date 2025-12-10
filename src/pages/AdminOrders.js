import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const statusOptions = ["Pending", "Packed", "Shipped", "Delivered"];

  useEffect(() => {
    async function loadOrders() {
      try {
        const snap = await getDocs(collection(db, "orders"));
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setOrders(list.reverse()); // latest first
      } catch (err) {
        console.error("Order fetch error:", err);
      }
    }
    loadOrders();
  }, []);

  // 🔍 FILTER ORDERS
  const filteredOrders = orders.filter((o) =>
    o.address?.name?.toLowerCase().includes(search) ||
    o.address?.phone?.includes(search) ||
    o.id.toLowerCase().includes(search)
  );

  // 🔥 UPDATE ORDER STATUS
  const updateStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
        updatedAt: Timestamp.now(),
      });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="admin-orders-page">
      <h2 className="admin-title">📦 All Orders (Admin Panel)</h2>

      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by name, phone, order ID…"
        className="admin-search"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {filteredOrders.length === 0 ? (
        <p className="no-orders">No matching orders found.</p>
      ) : (
        <div className="order-grid">
          {filteredOrders.map((order) => (
            <div className="admin-order-card" key={order.id}>
              <div className="order-header">
                <h3>Order ID: {order.id}</h3>
                <p className="order-date">
                  {order.createdAt?.toDate?.().toLocaleString()}
                </p>
              </div>

              <div className="order-section">
                <p><b>Name:</b> {order.address?.name}</p>
                <p><b>Phone:</b> {order.address?.phone}</p>
                <p>
                  <b>Address:</b> 
                  {order.address?.house}, {order.address?.area},{" "}
                  {order.address?.city} - {order.address?.pincode}
                </p>
              </div>

              <h4>Items:</h4>
              <div className="admin-items">
                {order.items?.map((item, i) => (
                  <div className="admin-item" key={i}>
                    <img src={item.image} alt="" />
                    <div>
                      <p>{item.title}</p>
                      <p className="qty">Qty: {item.qty}</p>
                    </div>
                    <strong>₹{item.qty * item.price}</strong>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <p>Subtotal: ₹{order.subtotal}</p>
                <p>Delivery: ₹{order.deliveryCharge}</p>
                <h3>Total: ₹{order.total}</h3>

                {/* 🔥 STATUS DROPDOWN */}
                <select
                  className="status-dropdown"
                  value={order.status || "Pending"}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
