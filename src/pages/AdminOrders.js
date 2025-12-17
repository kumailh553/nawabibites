import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);




const [activeStatus, setActiveStatus] = useState("PAID");


  
  const fetchOrdersByDate = async (date) => {
    setLoading(true);

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const q = query(
      collection(db, "orders"),
      where("createdAt", ">=", Timestamp.fromDate(start)),
      where("createdAt", "<=", Timestamp.fromDate(end))
    );

    const snap = await getDocs(q);
    const list = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setOrders(list);
    setLoading(false);
  };

  // 🔥 Load today's orders by default
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    fetchOrdersByDate(today);
  }, []);

  // 🔍 Search filter
  const filteredOrders = orders.filter((o) =>
    o.address?.name?.toLowerCase().includes(search) ||
    o.address?.phone?.includes(search) ||
    o.id.toLowerCase().includes(search)
  );



const statusFilteredOrders = filteredOrders.filter(
  (o) => (o.status || "PENDING") === activeStatus
);


const countByStatus = (status) =>
  orders.filter(o => (o.status || "PENDING") === status).length;






  const totalAmount = filteredOrders.reduce(
    (sum, o) => sum + o.total,
    0
  );

  // 🔥 Update status
  const updateStatus = async (orderId, status) => {
    await updateDoc(doc(db, "orders", orderId), {
      status,
      updatedAt: Timestamp.now(),
    });

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status } : o
      )
    );
  };

  // 🔥 Update any field (tracking url/id)
  const updateOrderField = async (orderId, field, value) => {
    await updateDoc(doc(db, "orders", orderId), {
      [field]: value,
      updatedAt: Timestamp.now(),
    });

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, [field]: value } : o
      )
    );
  };

  return (
    <div className="admin-orders-page">
      <h2 className="admin-title">📦 Admin Orders</h2>


<div className="status-tabs">
  <button
    className={activeStatus === "PAID" ? "active" : ""}
    onClick={() => setActiveStatus("PAID")}
  >
    🟢 Paid ({countByStatus("PAID")})
  </button>

  <button
    className={activeStatus === "PENDING" ? "active" : ""}
    onClick={() => setActiveStatus("PENDING")}
  >
    🟡 Pending ({countByStatus("PENDING")})
  </button>

  <button
    className={activeStatus === "FAILED" ? "active" : ""}
    onClick={() => setActiveStatus("FAILED")}
  >
    🔴 Failed ({countByStatus("FAILED")})
  </button>
</div>


      {/* 📅 DATE FILTER */}
      <div className="date-filter">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            fetchOrdersByDate(e.target.value);
          }}
        />
      </div>

      {/* 📊 STATS */}
      <div className="stats">
        <p>📦 Orders: <b>{filteredOrders.length}</b></p>
        <p>💰 Amount: <b>₹{totalAmount}</b></p>
      </div>

      {/* 🔍 SEARCH */}
      <input
        className="admin-search"
        placeholder="Search name / phone / order id"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {loading && <p>Loading...</p>}

      {!loading && filteredOrders.length === 0 && (
        <p>No orders found</p>
      )}

      <div className="order-grid">
       {statusFilteredOrders.map((order) => (

          <div className="admin-order-card" key={order.id}>
            <h3>Order #{order.id}</h3>
            <p>{order.createdAt?.toDate().toLocaleString()}</p>

            <p><b>{order.address?.name}</b> | ₹{order.total}</p>

            {/* Tracking */}
            <input
              className="tracking-input"
              placeholder="Tracking ID"
              defaultValue={order.trackingId || ""}
              onBlur={(e) =>
                updateOrderField(order.id, "trackingId", e.target.value)
              }
            />

            <input
              className="tracking-input"
              placeholder="Tracking URL"
              defaultValue={order.trackingUrl || ""}
              onBlur={(e) =>
                updateOrderField(order.id, "trackingUrl", e.target.value)
              }
            />



      <div className="order-section">
                <p><b>Name:</b> {order.address?.name}</p>
                <p><b>Phone:</b> {order.address?.phone}</p>
                <p>
                  <b>Address:</b>
                  {order.address?.house}, {order.address?.area},{" "}
                  {order.address?.city} ,{order.address?.state}- {order.address?.pincode}

                </p>
              </div>




             {/* Items */}
            {order.items?.map((item, i) => (
              <div className="admin-item" key={i}>
                <img src={item.image} alt="" />
                <div>
                  <p>{item.title}</p>
                  <small>Qty: {item.qty}</small>
                </div>
                <b>₹{item.qty * item.price}</b>
              </div>
            ))}

        
          </div>
        ))}
      </div>
    </div>
  );
}
