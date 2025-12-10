import React, { useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SingleAuth() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!email || !pass) {
      alert("Please enter email & password");
      return;
    }

    try {
      // 🔹 Try Login First
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/checkout");
    } catch (err) {
      console.log("Login failed, creating account...");

      try {
        // 🔹 Auto Signup
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("ACCOUNT CREATED SUCESSFULL✔");
        navigate("/checkout");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box fade-in">
        <h2>Welcome</h2>
        <p>Just Signup/Login to check order and tracking details after placing an order</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button onClick={handleAuth}>Continue</button>
      </div>
    </div>
  );
}
