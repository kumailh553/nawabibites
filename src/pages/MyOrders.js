import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (!auth.currentUser)
    return <h2 style={{ padding: 20 }}>Please login to view your orders.</h2>;

  if (loading) return <h2 className="loading">Loading orders...</h2>;

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You have not placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <h3>Order ID: {order.id}</h3>
                <span className="order-date">
                  {order.createdAt?.toDate?.().toLocaleString()}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, i) => (
                  <div className="order-item" key={i}>
                    <img src={item.image} alt="" />
                    <div>
                      <p className="item-title">{item.title}</p>
                      <p className="qty">Qty: {item.qty}</p>
                    </div>
                    <strong className="item-price">
                      ₹{item.qty * item.price}
                    </strong>
                  </div>
                ))}
              </div>

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
