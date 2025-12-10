// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_UIEZZ1pOaCB5FaM7gQ8UqOK5wZGLLPM",
  authDomain: "nawabibites-6187c.firebaseapp.com",
  projectId: "nawabibites-6187c",
  storageBucket: "nawabibites-6187c.firebasestorage.app",
  messagingSenderId: "932656757040",
  appId: "1:932656757040:web:97cfb6d913b91bce6930f5",
  measurementId: "G-B1JDDLNRTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export required Firebase services
export const db = getFirestore(app);       // Database
export const auth = getAuth(app);          // Authentication
export const storage = getStorage(app);    // Image uploads

// ⭐ MUST EXPORT FOR OTP LOGIN
export { RecaptchaVerifier, signInWithPhoneNumber };
