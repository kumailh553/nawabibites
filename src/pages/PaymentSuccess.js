import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, updateDoc, Timestamp } from "firebase/firestore";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const orderId = params.get("order_id");
  const phone = params.get("phone"); // phone pass karna backend se
  const email = phone ? `${phone}@guest.nawabibites.com` : null;

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId || !email) return;

    const randomPass = generatePassword();
    setPassword(randomPass);

    async function processOrder() {
      try {
        let user;

        try {
          // 1️⃣ Create guest account
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            randomPass
          );
          user = res.user;
        } catch (err) {
          // 2️⃣ If already exists → login
          const res = await signInWithEmailAndPassword(
            auth,
            email,
            randomPass
          );
          user = res.user;
        }

        // 3️⃣ Update Firestore Order
        await updateDoc(doc(db, "orders", orderId), {
          userId: user.uid,
          email,
          status: "PAID",
          paidAt: Timestamp.now(),
        });

        // 4️⃣ Save user profile
        await setDoc(
          doc(db, "users", user.uid),
          {
            phone,
            email,
            role: "customer",
            createdAt: Timestamp.now(),
          },
          { merge: true }
        );

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    processOrder();
  }, [orderId, email]);

  if (loading) return <h2>Processing payment...</h2>;

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🎉 Payment Successful</h1>

      <p>Your order has been placed successfully.</p>

      <div
        style={{
          margin: "20px auto",
          padding: 20,
          maxWidth: 400,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h3>🔐 Login Details</h3>
        <p>
          <b>Mobile:</b> {phone}
        </p>
        <p>
          <b>Password:</b> {password}
        </p>
        <p style={{ color: "red", fontSize: 13 }}>
          ⚠️ Please save this password. You can change it later.
        </p>
      </div>

      <button onClick={() => navigate("/orders")}>
        📦 View My Orders
      </button>
    </div>
  );
}

// 🔑 Password Generator
function generatePassword() {
  return Math.random().toString(36).slice(-8);
}
