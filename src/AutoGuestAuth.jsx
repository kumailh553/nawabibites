import { useEffect } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function AutoGuestAuth({ children }) {

  useEffect(() => {
    const autoLogin = async () => {
      if (auth.currentUser) return;

      const email = `guest_${Date.now()}@nawabibites.com`;
      const password = Math.random().toString(36).slice(-8);

      await createUserWithEmailAndPassword(auth, email, password);

      // optional: success page ke liye
      localStorage.setItem("guest_email", email);
      localStorage.setItem("guest_password", password);
    };

    autoLogin();
  }, []);

  return children;
}
