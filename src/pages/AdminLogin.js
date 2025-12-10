import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ADMIN_EMAIL } from "../utils/adminAuth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, pass);

      if (user.user.email === ADMIN_EMAIL) {
        navigate("/admin/orders");
      } else {
        alert("Not authorized as admin!");
      }
    } catch (err) {
      alert("Invalid credentials!");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Admin Login</h2>

      <input
        style={{ padding: 10, width: "70%", marginTop: 20 }}
        placeholder="Admin Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        style={{ padding: 10, width: "70%", marginTop: 10 }}
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
      />

      <button
        onClick={loginAdmin}
        style={{
          padding: 10,
          marginTop: 20,
          width: "50%",
          background: "black",
          color: "white",
          borderRadius: 6,
        }}
      >
        Login
      </button>
    </div>
  );
}
