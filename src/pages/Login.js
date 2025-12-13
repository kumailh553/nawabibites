import React, { useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth";










import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";









export default function SingleAuth() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");





const provider = new GoogleAuthProvider();




const handleForgotPassword = async () => {
  if (!email) {
    alert("Please enter your email first");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent to your email 📩 and also check Spam folder");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};








const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log("Google User:", user);

    alert("Login successful with Google 🎉");

    // redirect after login
    navigate("/");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};



















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







<p className="forgot-link" onClick={handleForgotPassword}>
  Forgot Password?
</p>













<button className="google-btn" onClick={handleGoogleLogin}>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google"
    className="google-icon"
  />
  <span>Continue with Google</span>
</button>







      </div>
    </div>
  );
}
