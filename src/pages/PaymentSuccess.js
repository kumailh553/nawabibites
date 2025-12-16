import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db, auth } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderId = params.get("order_id");

  useEffect(() => {
    async function saveOrder() {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        cashfreeOrderId: orderId,
        status: "Paid",
        createdAt: Timestamp.now(),
      });

      navigate("/orders");
    }

    saveOrder();
  }, []);

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h2>Payment Successful 🎉</h2>
      <p>Your order has been placed successfully</p>
    </div>
  );
}