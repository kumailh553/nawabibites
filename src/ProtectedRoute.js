import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setInitializing(false);
    });

    return () => unsub();
  }, []);

  if (initializing) {
    return (
      <div style={{ padding: 30, fontSize: 22 }}>
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
