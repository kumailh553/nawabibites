import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Signup Function
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Signup successful!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Login Function
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "300px", margin: "auto" }}>
      <h2>Login / Signup</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleSignup} style={{ width: "100%", marginBottom: "10px" }}>
        Signup
      </button>

      <button onClick={handleLogin} style={{ width: "100%", marginBottom: "10px" }}>
        Login
      </button>

      <p>{message}</p>
    </div>
  );
};

export default Login;
