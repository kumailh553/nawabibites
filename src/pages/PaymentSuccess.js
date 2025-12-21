import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const orderId = params.get("order_id"); // Cashfree se aata hai

  useEffect(() => {
    if (!orderId) return;

    async function saveOrder() {
      try {
        await setDoc(doc(db, "orders", orderId), {
          orderId,
          userId: auth.currentUser?.uid || "GUEST",
          email: auth.currentUser?.email || "guest@nawabibites.com",
          status: "PAID",
          createdAt: Timestamp.now(),
        });

        console.log("Order saved successfully");
      } catch (err) {
        console.error("Failed to save order", err);
      }
    }

    saveOrder();
  }, [orderId]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🎉 Payment Successful</h1>
      <p>Your order has been placed successfully.</p>

      <button onClick={() => navigate("/orders")}>
        View My Orders
      </button>
    </div>
  );
}
