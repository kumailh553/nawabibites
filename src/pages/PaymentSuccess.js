import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("order_id");

  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    if (!orderId) return;

    fetch(`https://mukaishworkspecialist.com/verify_payment.php?order_id=${orderId}`)
      .then(res => res.json())
      .then(async (data) => {
        if (data.order_status === "PAID") {
          // ✅ Firestore update
          await updateDoc(doc(db, "orders", orderId), {
            paymentStatus: "PAID",
            paidAt: serverTimestamp(),
          });

          setStatus("✅ Payment Successful!");
        } else {
          setStatus("❌ Payment not completed");
        }
      })
      .catch(() => {
        setStatus("❌ Verification failed");
      });
  }, [orderId]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>{status}</h2>

      {status.includes("Successful") && (
        <button onClick={() => navigate("/my-orders")}>
          View My Orders
        </button>
      )}
    </div>
  );
}
